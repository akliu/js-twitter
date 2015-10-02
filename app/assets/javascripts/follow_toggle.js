$.FollowToggle = function (el, options) {
  this.$el = $(el);
  this.userId = this.$el.data("user-id") || options.userId;
  this.followState = this.$el.data("initial-follow-state") || options.followState;
  this.render();
  this.$el.on("click", this.handleClick.bind(this));
};



$.FollowToggle.prototype.render = function () {
  if (this.followState === "followed"){
    this.$el.prop("disabled", false);
    this.$el.append("Unfollow!");
  } else if (this.followState === "unfollowed") {
    this.$el.prop("disabled", false);
    this.$el.append("Follow!");
  } else {
    this.$el.prop("disabled", true);
  }
};

$.FollowToggle.prototype.handleClick = function(e){
  e.preventDefault();

  if(this.followState === "unfollowed")
  {
    this.$el.empty();
    this.followState = "following";
    this.render();

    $.ajax({
      url: "/users/"+this.userId+"/follow",
      type: "post",
      dataType: 'json',
      success: function(responseData){
        this.followState = "followed";
        this.$el.empty();
        this.render();
      }.bind(this)
    });
  }
  else{

    this.$el.empty();
    this.followState = "unfollowing";
    this.render();

    $.ajax({
      url: "/users/"+this.userId+"/follow",
      type: "delete",
      dataType: 'json',
      success: function(responseData){
        this.followState = "unfollowed";
        this.$el.empty();
        this.render();
      }.bind(this)
    });
  }
};

$.fn.followToggle = function (options) {
  return this.each(function () {
    new $.FollowToggle(this, options);
  });
};

$(function () {
  $("button.follow-toggle").followToggle();
});
