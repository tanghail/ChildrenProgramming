package com.thl.advice;

import java.lang.reflect.Method;
import java.util.Date;

import org.apache.log4j.Logger;
import org.springframework.aop.MethodBeforeAdvice;

public class MyBefore implements MethodBeforeAdvice {
	
	
	@Override
	public void before(Method arg0, Object[] arg1, Object arg2) throws Throwable {
		Logger logger = Logger.getLogger(MyBefore.class);
		logger.debug(arg1[0] + "于" + new Date().toLocaleString() + "申请登录系统！");
	}

}
