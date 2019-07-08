package com.thl.test;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class test01 {
	public static void main(String[] args) {
		ApplicationContext ac = new ClassPathXmlApplicationContext("applicationContext.xml");
		String[] beanStrings = ac.getBeanDefinitionNames();
		for(String str : beanStrings) {
			System.out.println(str);
		}
	}

}
