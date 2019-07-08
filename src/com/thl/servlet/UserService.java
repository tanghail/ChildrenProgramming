package com.thl.servlet;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.thl.pojo.User;
import com.thl.service.LoginService;
import com.thl.service.impl.LoginServiceImpl;

/**
 * 	本段代码提供了用户信息的相关操作，主要包括：
 * 	1、登录
 * 	2、注册
 * 	3、修改密码
 * 	4、退出
 * 	5、展示用户信息
 * 
 * 
 * @author 唐海浪
 *
 */


@WebServlet("/login")
public class UserService extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private LoginService loginsService;
       
    public UserService() {
        super();
    }
    
    @Override
	public void init() throws ServletException {
		WebApplicationContext ac = WebApplicationContextUtils.getRequiredWebApplicationContext(getServletContext());
		loginsService = ac.getBean("loginServiceImpl",LoginServiceImpl.class);
	}

    @Override
	protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
				
			req.setCharacterEncoding("utf-8");			
			resp.setContentType("text/html;charset=utf-8");
		
			String oper=req.getParameter("oper");
			if("login".equals(oper)){
		
				checkUserLogin(req, resp);
			}else if("out".equals(oper)){
		
				userOut(req,resp);
			}else if("pwd".equals(oper)){
			
				userChangePwd(req,resp);	
			}else if("show".equals(oper)){
		
				userShow(req,resp);
			}else if("reg".equals(oper)){

				userReg(req,resp);
			}else if("userInfo".equals(oper)){
				userInfo(req,resp);
			}else{
				System.out.println("没有找到对应操作符");
			}
	}
	
	private void userInfo(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		//查询用户的个人信息
		req.getRequestDispatcher("/userInfo.jsp").forward(req, resp);
	}

	//用户验证功能
	private void checkUserLogin(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
		String uname=req.getParameter("username");
		String pwd=req.getParameter("password");
		
		if(uname == null || pwd == null) {
			req.setAttribute("flag",0);
			req.getRequestDispatcher("/404.jsp").forward(req, resp);
			return;
		}
	
		User u=loginsService.checkUser(uname, pwd);
		//System.out.println(u.getName() +" " + u.getPassword());
			if(u!=null){
	
				HttpSession hs=req.getSession();
				hs.setAttribute("user", u);
//				req.getRequestDispatcher("/index.html").forward(req, resp);
				resp.sendRedirect("index.jsp");
				return;
			}else{
				//用户名或密码不正确是从后台返回的标志
				req.setAttribute("flag",0);
				req.getRequestDispatcher("/404.jsp").forward(req, resp);
				return;
			
			}
	}
	
	//用户退出功能
	private void userOut(HttpServletRequest req, HttpServletResponse resp) throws IOException {	
		HttpSession hs=req.getSession();
		hs.invalidate();
		resp.sendRedirect("/ChildrenProgramming/index.jsp");
	}
	
	//修改密码功能
	private void userChangePwd(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		String newPwd=req.getParameter("newPwd");
		User oldUser=(User)req.getSession().getAttribute("user");
		User newUser = new User();
		newUser.setPassword(newPwd);
		
		
		int index = loginsService.userChangePwd(newUser, oldUser);
		if(index>0){
			//更改密码成功，返回更改成功的标志位
			HttpSession hs=req.getSession();
			hs.setAttribute("pwd","true");
			//重新登录
			resp.sendRedirect("/ChildrenProgramming/index.jsp");
		}
	}
	
	//用户展示功能
	private void userShow(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		List<User> lu=loginsService.userShow();
		
		if(lu!=null){
			req.setAttribute("lu",lu);
			req.getRequestDispatcher("/userInfo.jsp").forward(req, resp);
			return;
		}
	
	}
	
	//注册功能
	private void userReg(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		
		String uname=req.getParameter("uname");
		String pwd=req.getParameter("pwd");
		System.out.println("name=" + uname + "password="+pwd);
		User u = new User();
		u.setGameProgress(3);
		u.setName(uname);
		u.setPassword(pwd);
		int index=loginsService.userRegister(u);
		System.out.println(index);

		if(index>0){		
			HttpSession hs=req.getSession();
			hs.setAttribute("reg", "true");
			resp.sendRedirect("/ChildrenProgramming/index.jsp");
		}
	
}
	
	
	
	
	
	
	
}

