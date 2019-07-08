package com.thl.service.impl;

import java.util.List;

import com.thl.mapper.UserMapper;
import com.thl.pojo.User;
import com.thl.service.LoginService;

public class LoginServiceImpl implements LoginService {
	private UserMapper userMapper;

	public UserMapper getUserMapper() {
		return userMapper;
	}
	public void setUserMapper(UserMapper userMapper) {
		this.userMapper = userMapper;
	}


	@Override
	public User checkUser(String name, String password) {
//		User u = new User();
//		u.setName(name);
//		u.setPassword(password);
		return userMapper.selByUser(name, password);
	}
	
	@Override
	public int userChangePwd(User newUser, User oldUser) {
		oldUser.setPassword(newUser.getPassword());
		return userMapper.updUser(oldUser);
	}
	
	@Override
	public List<User> userShow() {
		List<User> list = userMapper.selAll();
		return list;
	}
	
	@Override
	public int userRegister(User user) {
		return userMapper.insUser(user);
	}
}
