document.addEventListener('DOMContentLoaded', function() {
    var sideNav = document.querySelectorAll('.sidenav');
    var modal = document.querySelectorAll('.modal');
    var FloatActionButton = document.querySelectorAll('.fixed-action-btn');
    M.Sidenav.init(sideNav);
    M.Modal.init(modal);
    M.FloatingActionButton.init(FloatActionButton);
});