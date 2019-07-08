package com.thl.servlet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.thl.pojo.User;
import com.thl.service.impl.GameServiceImpl;

/**
 * Servlet implementation class SaveProgress
 */
@WebServlet(description = "保存玩家的游戏关卡数", urlPatterns = { "/SaveProgress" })
public class SaveProgress extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private GameServiceImpl gameService;
	
    public SaveProgress() {
        super();
    }
    
    @Override
	public void init() throws ServletException {
		WebApplicationContext wac = WebApplicationContextUtils.getRequiredWebApplicationContext(getServletContext());
		gameService = wac.getBean("gameServiceImpl",GameServiceImpl.class);
	}
    
    @Override
    	protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    		int progress = Integer.parseInt(req.getParameter("progress"));
    		if(progress <=3) {
    			System.out.println(progress);
    			//test
    			resp.sendRedirect("/ChildrenProgramming/checkpoints/level_1_2.html");
//    			req.getRequestDispatcher("/checkpoints/level_1_2.html").forward(req, resp);
    			return;
    		}
    		HttpSession hs = req.getSession();
    		User u = (User)hs.getAttribute("user");
    		if(u != null) {
    			int currntProgress = u.getGameProgress();
    			//只有当前关卡数超过自己的最高关卡数是才保存进度
    			if(progress > currntProgress) {
    				progress +=1;
    				u.setGameProgress(progress);
    				gameService.updProgress(u);
    				if(progress <= 5) {
    					resp.sendRedirect("/ChildrenProgramming/checkpoints/level_1_"+progress+".html");
    				}else if (progress == 12) {
    					//只有11关
    					resp.sendRedirect("/ChildrenProgramming/checkpoints/ch_level.html");
					}else {
						progress = progress -5 ;
						resp.sendRedirect("/ChildrenProgramming/checkpoints/level_2_"+progress+".html");
					}
    			}
    		}else {
				//如果当前用户未登录，转发到登录页面
    			req.getRequestDispatcher("/login.html").forward(req, resp);
			}
    	}



}
