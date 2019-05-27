
var Login = (function () {

    var lg = function () {
        //this.constructor.create();
    };

    lg.isLogin = function () {
        if (localStorage.getItem('user') && localStorage.getItem('password')) {
            USER = localStorage.getItem('user');
            PASSWORD = localStorage.getItem('password');
            return true;
        }
        else
            return false;
    };

    lg.login = function (user, password) {

        return DAL.login(user, password).done(function(response) {

            var filtered = response.filter(function(u) {
                return u.appName == user && u.password == password;
            });
			
            if (filtered.length == 1) {
                USER = user;
                PASSWORD = password;
                localStorage.setItem('user', user);
                localStorage.setItem('password', password);
                return true;
            }
            else {
                return false;
            }
        });
    };

    lg.clearLocalStorage = function (user, password) {
        localStorage.clear();
    };

    return lg;
})();


