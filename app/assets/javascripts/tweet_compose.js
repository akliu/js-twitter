$.TweetCompose = function (el) {
  this.$el = $(el);
  this.$textArea = this.$el.find("textarea");
  this.$el.on("submit", this.submit.bind(this));
  this.$textArea.on("input", this.handleInput.bind(this));
};

$.TweetCompose.prototype.submit = function(e){
  e.preventDefault();
  this.$textArea.prop("disabled", true);
  this.tweetContent = this.$textArea.val();
  var data = {tweet: {content: this.tweetContent}};

  $.ajax({
    url: "/tweets",
    type: "post",
    data: data,
    dataType: "json",
    success: function(responseData){
      this.handleSuccess(responseData);
    }.bind(this)

  });
};

$.TweetCompose.prototype.handleSuccess = function(responseData){
  this.clearInput();
  this.$textArea.prop("disabled", false);
  var $feed = $("ul#feed");


  var content = responseData.content;
  var userName = responseData.user.username;
  var userId = responseData.user_id;

  var aTag = $('<a></a>').attr("href", "/users/" + userId.toString());
  aTag.append(userName);

  var $li = $('<li></li>').append(content + " -- ");
  $li.append(aTag);
  $li.append(" -- " + moment().format('MMMM Do YYYY, h:mm:ss a'));


  $feed.append($li);
};

$.TweetCompose.prototype.clearInput = function(){
  this.$textArea.val("");
  this.tweetContent = "";
};

$.TweetCompose.prototype.handleInput = function(){
  this.$el.find("strong.chars-left").empty();
  this.$el.find("strong.chars-left").append(140 - this.$textArea.val().length);
}

$.fn.tweetCompose = function () {
  return this.each(function () {
    new $.TweetCompose(this);
  });
};

$(function () {
  $("form.tweet-compose").tweetCompose();
});
