package com.thl.service.impl;

import com.thl.mapper.UserMapper;
import com.thl.pojo.User;
import com.thl.service.GameService;

public class GameServiceImpl implements GameService {
	private UserMapper userMapper;
	
	public UserMapper getUserMapper() {
		return userMapper;
	}

	public void setUserMapper(UserMapper userMapper) {
		this.userMapper = userMapper;
	}

	@Override
	public int updProgress(User user) {
		return userMapper.updProgress(user);
}
}
