package com.thl.service;

import java.util.List;

import com.thl.pojo.User;

/**
 *  	定义登录模块需要使用的功能
 * @author 唐海浪
 *
 */
public interface LoginService {
	public User checkUser(String name, String password);
	public int userChangePwd(User newUser, User oldUser);
	public List<User> userShow();
	public int userRegister(User user);
  }
