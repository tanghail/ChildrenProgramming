package com.thl.servlet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.thl.pojo.User;


@WebServlet("/StartGame")
public class StartGame extends HttpServlet {
	private static final long serialVersionUID = 1L;
    
    public StartGame() {
        super();
    }
    
    /**
     * 	在系统的主界面，有各个不同的游戏链接，当用户点击游戏链接时，tomcat容器会把请求交到此servlet
     * 	在此Servlet中，从请求中取出当前请求游戏的关卡数，比较该用户当前的游戏进度，若小于游戏进度，可以玩该游戏
     * 	否则不能玩该游戏，返回游戏的主界面
     */
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) 
    		throws ServletException, IOException {
    	int progress = Integer.parseInt(req.getParameter("progress"));
    	System.out.println("progress:"+progress);
    	HttpSession hs = req.getSession();
    	User user = (User) hs.getAttribute("user");
    	System.out.println("user:" + user);
    	if(user != null) {		
    		int gameProgress = user.getGameProgress();
    		if(progress <= gameProgress) {
    			if(progress <= 5) {
//    				req.getRequestDispatcher("/checkpoints/level_1_" + progress +".html").forward(req, resp);
    				resp.sendRedirect("/ChildrenProgramming/checkpoints/level_1_" + progress +".html");
    			}else {
    				progress = progress - 5;
    				resp.sendRedirect("/ChildrenProgramming/checkpoints/level_2_" + progress +".html");
//    				req.getRequestDispatcher("/checkpoints/level_2_" + progress +".html").forward(req, resp);					
				}
    		}else {
    			//如果选择的游戏的关数超过的当前的进度，则会提示报错，转发到游戏的选关界面
    			req.setAttribute("msg", "先玩之前的关卡！");
    			resp.sendRedirect("/ChildrenProgramming/checkpoints/ch_level.html");
//    			req.getRequestDispatcher("/checkpoints/ch_level.html").forward(req, resp);
    		}
    	}else {
			req.getRequestDispatcher("/login.html").forward(req, resp);
		}

    }


}
