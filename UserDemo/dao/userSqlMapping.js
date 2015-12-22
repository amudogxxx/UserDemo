/**
 * Created by 觐松 on 2015/12/17.
 */

// CRUD SQL语句
var user = {
    insert:'INSERT INTO userinfo(user_name,user_login,user_password,user_comment,create_time) VALUES(?,?,?,?,?)',
    update:'update userinfo set user_name=?,user_login=?,user_password=?,user_comment=? where user_id=?',
    delete: 'delete from userinfo where id=?',
    queryById: 'select * from userinfo where id=?',
    queryAll: 'select * from userinfo',
    queryLoginExists: 'select count(user_id) as counts from userinfo where user_login=?',
    updateLoginTime:'update userinfo set login_time =? where user_login=?',
    login:'select * from userinfo where user_login =? and user_password=?'
};

module.exports = user;
