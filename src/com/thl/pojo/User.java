package com.thl.pojo;

/**
 * User用户类，注意首字母要小写，因为生成的get/set方法或将属性首字母自动大写
 * @author 唐海浪
 *
 */

public class User {
	private int id;
	private String name;
	private String password;
	private int gameProgress;
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public int getGameProgress() {
		return gameProgress;
	}
	public void setGameProgress(int gameProgress) {
		this.gameProgress = gameProgress;
	}
	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", password=" + password + ", gameProgress=" + gameProgress + "]";
	}
	
	
	

}
