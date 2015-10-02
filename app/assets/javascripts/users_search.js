$.UsersSearch = function (el) {
  this.$el = $(el);
  this.$input = this.$el.find("input");
  this.$ul = this.$el.find("ul.users");
  this.$input.on("input", this.handleInput.bind(this));
};

$.UsersSearch.prototype.handleInput = function(e){
  var input = this.$input.val();
  $.ajax({
    url:'/users/search',
    type: "get",
    data: {query: input},
    dataType: 'json',
    success: function(responseData){
      this.renderResults(responseData);
    }.bind(this)
  });
};
$.UsersSearch.prototype.renderResults = function(responseData){
  this.$ul.empty();
  for (var i = 0; i < responseData.length; i++) {
    var id = responseData[i].id.toString();
    var username = responseData[i].username;
    var options = {userId: id, followState: responseData[i].followed ? "followed" : "unfollowed" };

    var $li = $("<li> <a href=\"/users/"+id+"\">"+username + "</a> </li>");
    var button = $("<button>").addClass("follow-toggle");
    $li.append(button.followToggle(options));
    this.$ul.append($li);
  }
};

$.fn.usersSearch = function () {
  return this.each(function () {
    new $.UsersSearch(this);
  });
};

$(function () {
  $("div.users-search").usersSearch();
});
