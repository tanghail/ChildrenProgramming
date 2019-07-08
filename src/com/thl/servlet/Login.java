package com.thl.servlet;

import java.io.IOException;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.thl.pojo.User;
import com.thl.service.LoginService;
import com.thl.service.impl.LoginServiceImpl;

/**
 * 	实现用户的登录功能
 * @author 唐海浪
 *
 */
@WebServlet("/Login")
public class Login extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private LoginService loginsService;

	public void init(ServletConfig config) throws ServletException {
		ApplicationContext ac = WebApplicationContextUtils.getRequiredWebApplicationContext(getServletContext());
		loginsService = ac.getBean("loginServiceImpl",LoginServiceImpl.class);
	}

	
	protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		req.setCharacterEncoding("utf-8");
		String name = req.getParameter("name");
		String password = req.getParameter("password");
		
		if(!name.equals("") && !password.equals("") && name != null && password != null) {
			//用户名和密码都不为空
			User user = loginsService.checkUser(name, password);
			if(user != null) {
				//验证正确
				HttpSession session = req.getSession();
				session.setAttribute("user", user);
				req.getRequestDispatcher("/main.jsp").forward(req, resp);
			}else {
				//用户不存在
				resp.sendRedirect("/login");
			}
		}else {
			//用户名和密码至少一个为空
			resp.sendRedirect("/login");
		}
		
		
	}

}
