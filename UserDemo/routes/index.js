var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao');
var validator = require('validator');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* login */
router.get('/login', function(req, res){
  res.render('login', {title: 'login'});
});

/* register */
router.get('/register', function(req, res){
  res.render('register', {title: 'register'});
});

/*regserver*/
router.post('/regserver', function(req, res, next){
  var query = {name: req.body.name, password: req.body.password, repassword: req.body.repassword};

  if(validator.isNull(query.name)) {
    console.log(" 用户名为空 " + new Date());
    res.send('用户名为空');
    return;
  }

  if(!validator.isMobilePhone(query.name,'zh-CN')){
    console.log(" 用户名不是手机号 " + new Date());
    res.send('用户名不是手机号');
    return;
  }

  if(validator.isNull(query.password)) {
    console.log(" 登录密码为空 " + new Date());
    res.send('登录密码为空');
    return;
  }

  if(!validator.isLength(query.password,6,6)) {
    console.log(" 输入六位密码 " + new Date());
    res.send('输入六位密码');
    return;
  }

  if(validator.isNull(query.repassword)) {
    console.log(" 确认密码为空 " + new Date());
    res.send('确认密码为空');
    return;
  }

  if(!validator.isLength(query.repassword,6,6)) {
    console.log(" 输入六位确认密码 " + new Date());
    res.send('输入六位确认密码');
    return;
  }

  if(!validator.equals(query.password, query.repassword)){
    console.log(" 两次输入密码不相等 " + new Date());
    res.send('两次输入密码不相等');
    return;
  }

  userDao.queryLogin(query.name, function(err, result) {
    if(err) {
      res.send('not found');
      return;
    }

    var counts = result[0].counts;
    console.log("counts:"+counts);
    if(!validator.equals(counts, '0')){
      console.log(" 该手机号码已经注册过 " + new Date());
      res.send('该手机号码已经注册过');
      return;
    } else {
      userDao.add(query.name, query.password, function (err, addResult) {
        if (err) {
          res.send('insert error');
          return;
        }
        //res.send(result.length === 1 ? result[0] : result);
        res.send("注册成功");
      });
    }
    //res.send(result.length === 1 ? result[0] : result);
  });

});

/* search */
router.get('/search', function(req, res){
  console.log("search");
  res.render('search', {title: 'search'});
});

/* search */
router.get('/show', function(req, res){
  userDao.queryAll(function(err, result){
    if(err) {
      res.send('not found');
    }
    console.log("before render:"+result[0]);
    res.render('showlist',{
      items:result
    });

  });
});

router.post('/login', function(req, res){
  var query = {name: req.body.name, password: req.body.password};

  if(validator.isNull(query.name)) {
    console.log(" 用户名为空 " + new Date());
    res.send('用户名为空');
    return;
  }

  if(!validator.isMobilePhone(query.name,'zh-CN')){
    console.log(" 用户名不是手机号 " + new Date());
    res.send('用户名不是手机号');
    return;
  }

  if(validator.isNull(query.password)) {
    console.log(" 登录密码为空 " + new Date());
    res.send('登录密码为空');
    return;
  }

  if(!validator.isLength(query.password,6,6)) {
    console.log(" 输入六位密码 " + new Date());
    res.send('输入六位密码');
    return;
  }

  userDao.userLogin(query.name, query.password, function(err, result){
    if(err) {
      res.send('not found');
      return;
    }
    var info = result[0];
    console.log("before render:"+info);
    res.send('登录成功');
    userDao.userUpdateLogin(query.name, function(err, updateResult){
      if(err) {
        res.send('not found');
        return;
      }
    });
    //res.send(result.length === 1 ? result[0] : result);
  });
});

//router.get('/showlist', function(req, res) {
//  res.render('showlist', {
//    title: '<h1>Express</h1>'
//    ,users:[{username: 'Wilson'},
//      {username: 'Wilson Zhong'},
//      {username: 'Zhong Wei'}]
//  });
//});

module.exports = router;

