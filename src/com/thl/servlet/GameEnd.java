package com.thl.servlet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.thl.pojo.User;
import com.thl.service.impl.GameServiceImpl;

/**
 * 	游戏结束会请求此servlet
 */
@WebServlet("/GameEnd")
public class GameEnd extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private GameServiceImpl gameServiceImpl;
	
	@Override
	public void init() throws ServletException {
		ApplicationContext ac = WebApplicationContextUtils.getRequiredWebApplicationContext(getServletContext());
		gameServiceImpl = ac.getBean("gameServiceImpl",GameServiceImpl.class);
	}
	
	/**
	 * 	玩家在游戏结束时会弹出一个窗口，询问是否保存进度。
	 * 	若保存进度，向后台发送请求，参数为当前游戏的进度，保存成功后返回主游戏界面
	 */
	@Override
	protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		int progress = Integer.parseInt(req.getParameter("progress"));
    	HttpSession hs = req.getSession();
    	User user = (User) hs.getAttribute("user");
    	user.setGameProgress(progress);
    	int index = gameServiceImpl.updProgress(user);
    	if(index > 0) {
    		req.setAttribute("msg", "进度保存成功");
    		req.getRequestDispatcher("/main.html").forward(req, resp);
    	}else {
			resp.sendRedirect("/main.html");
		}
    	
	}
       
}
