package com.thl.advice;

import java.lang.reflect.Method;

import org.apache.log4j.Logger;
import org.springframework.aop.AfterReturningAdvice;

import com.thl.pojo.User;

public class MyAfter implements AfterReturningAdvice {

	@Override
	public void afterReturning(Object arg0, Method arg1, Object[] arg2, Object arg3) throws Throwable {
		Logger logger = Logger.getLogger(MyAfter.class);
		if(arg0 != null) {
			User index = (User) arg0;
			logger.debug(index.getName() + "登录成功！" + "当前游戏关数是" + index.getGameProgress());	
			return;
		}
		logger.debug(arg2[0] + "登录失败！");				
	}

}
