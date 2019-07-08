package com.thl.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.thl.pojo.User;

public interface UserMapper {
	
	@Select("select * from User where name=#{arg0} and password=#{arg1}")
	public User selByUser(String name, String password);
	
	@Update("update User set password=#{password} where id=#{id}")
	public int updUser(User u);
	
	@Update("update User set gameProgress=#{gameProgress} where id=#{id}")
	public int updProgress(User u);
	
	@Select("select * from User")
	public List<User> selAll();
	
	@Insert("insert into User values(default, #{name}, #{password},#{gameProgress})")
	public int insUser(User u);

}
