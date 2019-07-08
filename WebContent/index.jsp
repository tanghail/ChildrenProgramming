<%@page import="java.io.PrintWriter"%>
<%@page import="java.io.OutputStream"%>
<%@page import="com.thl.pojo.User"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="auhtor" content="wuyao">
    <meta name="description" content="少儿编程网站">
    <meta name="generator" content="webstorm">
    <meta name="keywords" content="少儿编程">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>少儿编程网站</title>
    <link rel="stylesheet" href="lib/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/animate.css">
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <link rel="stylesheet" href="css/index.css">
    <script type="text/javascript" src="js/wow.js"></script>
    <script>
        new WOW().init();
    </script>
</head>
<body>
    <!--顶部区域-->
    <div class="row col-12 top-area">
        <div class="row top">
            
        </div>
        <div class="row bottom">
            <div class="row col-sm-3">
                <div class="logo wow animated zoomIn">
                    <h1>少儿编程<br><span>Playing&Coding</span></h1>
                </div>
            </div>
            <div class="row col-sm-7">
                <div class="nav">

                    <div class="row left">

                        <ul>
                            <li><a href="">首页</a></li>                        
                            <li><a href="/ChildrenProgramming/reference.jsp">关于</a></li>
                            <li><a href="login?oper=userInfo">个人信息</a></li>
						</ul>
                    </div>
                </div>

            </div>
            <div class="row col-sm-2">
				<div class="nav">
					<div class="row left" align="right">
						<ul>
						<%  
						User user = (User)session.getAttribute("user");
						if(user != null){
    					%> 
    						<li>您好，<% out.write(user.getName());%> 小朋友</li>
							<li><a href="login?oper=out">退出</a></li> 
						<%}
						else{
						%>						
							<li><a href="login.html">登录</a></li>
							<li><a href="register.html">注册</a></li>
						<%} %>
						</ul>
					</div>
				</div>
            </div>
        </div>
    </div>
    <!--顶部区域-->

    <!--焦点图-->
    <div class="focus-area">
        <div class="center wow animated zoomIn">
            <!--<div class="row">-->
                <div class="row title">
                    在游戏中学会编程

                </div>
            <div class="round">
            <a href="/ChildrenProgramming/checkpoints/ch_level.html">
            	PLAY
            </a>     
            </div>
                <div class="description">

                    <h1>最吸引人的编程游戏，<br>最优雅的编程语言，<br>
                        让每个人都快速学会编程</h1>
                    <div class="select">


                    </div>
                </div>
            <!--</div>-->
        </div>
    </div>
    <!--焦点图-->


    <!--热销区-->
    <div class="row hot">
        <div class="row col-md-4">
            <div class="hot-left wow fadeInLeft animated">
                <img src="images/left1.jpg" height="" width=""/>
                <div class="text">
                    <h1>在 <span>游戏中</span></h1>
                    <p>学习&成长</p>
                    <span class="one">由易到难的难度梯度</span>
                    <span class="two">生动形象数理逻辑思维</span>
                    <span class="three">独立学习，无需辅导</span>
                </div>
            </div>
        </div>
        <div class="row col-md-4">
            <div class="hot-center wow fadeInDownBig animated">
                <div class="top">
                    <img src="images/timg.jpg" height="345" width="640"/>
                    <div class="text">
                        编程从娃娃抓起
                    </div>
                </div>
                <div class="bottom">
                    <img src="images/timg1.jpg" height="345" width="640"/>
                    <div class="text">
                        <div class="border">
                            <div class="shadow">
                                在娱乐中
                                <br>
                                学习&成长
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row col-md-4">
            <div class="hot-right wow fadeInRight animated">
                <img src="images/right.jpg" height="491" width="427"/>
                <div class="text">
                    <span>数学</span><br>
                    <span>逻辑</span><br>
                    <span>思维</span>
                </div>
            </div>
        </div>
    </div>
    <!--热销区-->





    <!--新收集-->
    <div class="row col-md-12 newcoll-body">
        <div class="row newcoll">
            <div class="title wow animated zoomIn">
                <div>
                    <hr>
                    <span>你可以学到的技能</span>
                    <hr>
                </div>

            </div>

            <!--<div class="col-md-12" style="height:20px"></div>-->



            <div class="allproduct">
                <div class="row layer wow animated fadeInUpBig">
                    <div class="row col-md-3 col-sm-6 col-xs-12">
                        <div class="row productbox">
                            <div class="pic">
                                <img src="images/1-1.png" height="400" width="300"/>
                                <div class="shadow">

                                </div>
                                <div class="shadow-info">
                                    <input type="submit" value="课程详情">
                                    <p>
                                        <img src="images/2.png" height="15" width="15"/>
                                        <img src="images/2.png" height="15" width="15"/>
                                        <img src="images/2.png" height="15" width="15"/>
                                        <img src="images/1.png" height="15" width="15"/>
                                        <img src="images/1.png" height="15" width="15"/>
                                    </p>
                                </div>
                            </div>
                            <div class="info">
                                <h1>Python</h1>
                                <h3></h3>
                                <div>

                                </div>


                            </div>
                        </div>
                    </div>
                    <div class="row col-md-3 col-sm-6 col-xs-12">
                        <div class="row productbox">
                            <div class="pic">
                                <img src="images/1-2.png" height="400" width="300"/>
                                <div class="shadow">

                                </div>
                                <div class="shadow-info">
                                    <input type="submit" value="课程详情">
                                    <p>
                                        <img src="images/2.png" height="15" width="15"/>
                                        <img src="images/2.png" height="15" width="15"/>
                                        <img src="images/2.png" height="15" width="15"/>
                                        <img src="images/1.png" height="15" width="15"/>
                                        <img src="images/1.png" height="15" width="15"/>
                                    </p>
                                </div>
                            </div>
                            <div class="info">
                                <h1>HTML</h1>
                                <h3></h3>
                                <div>

                                </div>


                            </div>
                        </div>
                    </div>
                    <div class="row col-md-3 col-sm-6 col-xs-12">
                        <div class="row productbox">
                            <div class="pic">
                                <img src="images/1-3.png" height="400" width="300"/>
                                <div class="shadow">

                                </div>
                                <div class="shadow-info">
                                    <input type="submit" value="课程详情">
                                    <p>
                                        <img src="images/2.png" height="15" width="15"/>
                                        <img src="images/2.png" height="15" width="15"/>
                                        <img src="images/2.png" height="15" width="15"/>
                                        <img src="images/1.png" height="15" width="15"/>
                                        <img src="images/1.png" height="15" width="15"/>
                                    </p>
                                </div>
                            </div>
                            <div class="info">
                                <h1>CSS</h1>
                                <h3></h3>
                                <div>

                                </div>


                            </div>
                        </div>
                    </div>
                    <div class="row col-md-3 col-sm-6 col-xs-12">
                        <div class="row productbox">
                            <div class="pic">
                                <img src="images/1-4.png" height="400" width="300"/>
                                <div class="shadow">

                                </div>
                                <div class="shadow-info">
                                    <input type="submit" value="课程详情">
                                    <p>
                                        <img src="images/2.png" height="15" width="15"/>
                                        <img src="images/2.png" height="15" width="15"/>
                                        <img src="images/2.png" height="15" width="15"/>
                                        <img src="images/1.png" height="15" width="15"/>
                                        <img src="images/1.png" height="15" width="15"/>
                                    </p>
                                </div>
                            </div>
                            <div class="info">
                                <h1>Bootstrap</h1>
                                <h3></h3>
                                <div>

                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>









    <!--新收集-->



    <!--特刊-->
    <div class="row col-md-12 special-area">
        <div class="special">
            <div class="row col-md-8">
                <div class="special-text wow animated fadeInLeft">
                    <h1>我觉得他们甚至忘了他们在学东西。</h1>
                    <br>
                    <p>Tim Maki<br>
                        Director of Technology, Tilton School</p>
                    <br>


                </div>
            </div>
            <div class="row col-md-4">
                <div class="special-pic wow animated fadeInRight">
                    <div class="pic">
                        <img src="images/people.png" height="517" width="400"/>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--特刊-->
    <div class="clear"></div>










    <!--footer-->
    <div class="row col-md-12 footer-area">
        <div class="row footer">
            <div class="row col-md-3 col-sm-6 wow animated fadeInLeft">
                <h1>About Us</h1>
                <hr>
                <p>来自中国科学技术大学的研究生.</p>
                <p>致力于少儿编程教育方向的研究.</p>
            </div>
            <div class="row col-md-3 col-sm-6 wow animated fadeInLeft" style="padding-bottom: 20px">
                <h1>Contact Info</h1>
                <hr>
                <div>
                    <p>苏州市工业园区中科大苏州研究院.</p>
                </div>
                <div>
                    <p>329220887@qq.com</p>
                </div>
                <div>
                    <p>+18862137103</p>
                </div>
            </div>

        <div class="page-footer">
            <div class="logo wow animated fadeInUp">
                <hr>
                <p>少儿编程
                    <br>
                    <span>Playing&Coding</span>
                </p>
                <hr>
            </div>
            <div class="page-info wow animated fadeInUp">
                <p>© 2019 Shaoer Coding. All rights reserved | Design by <span>USTC</span></p>
            </div>
        </div>
    </div>
    <!--footer-->
</body>
</html>
