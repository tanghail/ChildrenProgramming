window.onload = PreInit;
window.onkeydown = KeyUp;
var hinton;//玩家是否开了提示，1表示开了
var context;//获取画布
var back;//背景图片
var grass;//草地图片
var rabbit;//当前兔子图片
var carrot;//胡萝卜图片
var pbx,pby;//当前兔子的位置信息
var gamestate;//游戏状态
var stepnum;//代码中的行走步数
//var m;
var refresh;//帧数刷新的循环变量
var maxrefresh;//刷新速率控制
var map;//游戏地图
var interval;//游戏循环开关
var maprow;//地图行数
var mapcolumn;//地图列数
var squaresize;//方格大小
var carrotx,carroty;//胡萝卜的位置数组
var direction;//兔子当前的面朝方向，0123分别指东南西北
var movedrt;//移动的面朝方向数组
var movedst;//移动的距离数组
var movelength;//前两个数组的长度
var movetimes;//前两个数组的遍历变量
var rabbits;//备选兔子图片文件路径
var loopstart;//循环起始点（包含）数组
var loopend;//循环终止点（不包含）数组
var looptimes;//循环次数数组
var looplevel;//该次循环最大层数，前三个数组的长度
var loopnum;//循环相关几个数组的遍历变量

function PreInit()//游戏的预处理工作，定义一些只需要赋一次值的变量
{
	hinton=0;
	maprow=20;
	mapcolumn=20;
	squaresize=36;
	maxrefresh=30;
	map=new Array();
	for(var i=0;i<maprow;i++)
		map[i]=new Array();
	carrotx=new Array();
	carroty=new Array();
	movedrt=new Array();
	movedst=new Array();
	loopstart=new Array();
	loopend=new Array();
	looptimes=new Array();
	var num=0;//胡萝卜数量
	for(var i=0;i<maprow;i++)
	for(var j=0;j<mapcolumn;j++)
	if(mymap[i][j]==4)
	{
		carrotx[num]=i;
		carroty[num]=j;
		num++;
	}
	rabbits=["resource/rabbit_right.png","resource/rabbit_down.png","resource/rabbit_left.png","resource/rabbit_up.png"];
	document.getElementById("code").innerHTML="";
	Init();
}
function Init()//对一旦代码运行成功但是游戏失败时就需要重新赋值的变量进行赋值，并调用GameLoop函数
{
    var canvas = document.getElementById("game");
    context = canvas.getContext("2d");
    back = LoadImage("resource/background.jpg");
	grass = LoadImage("resource/grass.png");
    rabbit = LoadImage(rabbits[0]);
    carrot = LoadImage("resource/carrot.png");
    //interval = setInterval(GameLoop,1000/60);
    gamestate=0;
    //m=0;
    refresh=0;
    /*map=
		[[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 3, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];*/
	initialized();
	context.clearRect(0,0,720,720);
	interval = setInterval(GameLoop,1000/60);
}

function LoadImage(src)                // 加载图函数  从硬盘到内存
{
    var img = new Image();
    img.src = src;
    return img;
}
function GameLoop()//游戏未开始时处于静止，代码提交一旦正确即开始演示游戏流程
{
    //context.drawImage(back,0,0);
    //context.drawImage(rabbit, 100 + 10 , 10 );
    //drawback();
    //游戏循环
    switch (gamestate)
	{
        case 0:
			drawback();
			drawRect();
            break;
        case 1:
			/*if(stepnum>0)
			{
                refresh++;
                if(refresh>10)
                {
                    context.clearRect(0,0,720,720);
                    if(map[pbx][pby+1]==4)
					{
                        map[pbx][pby]=0;
                        map[pbx][pby+1]=5;
                    }
                    else
					{
                        map[pbx][pby]=0;
                        map[pbx][pby+1]=3;
                    }
                    //drawRect();
                    drawback();
                    refresh=0;
                    stepnum--;
                }
            }*/
			if(movetimes<movelength)
			{
				refresh++;
                if(refresh>maxrefresh)
                {
					context.clearRect(0,0,720,720);
					if(movedst[movetimes]==0)
					{
						movetimes++;
						if(movetimes<movelength)
						{
							rabbit=LoadImage(rabbits[movedrt[movetimes]]);
						}
					}
					else
					{
						switch (movedrt[movetimes])
						{
							case 0:
								if(map[pbx][pby+1]==4)
								{
									map[pbx][pby]=0;
									map[pbx][pby+1]=5;
								}
								else
								{
									map[pbx][pby]=0;
									map[pbx][pby+1]=3;
								}
								break;
							case 1:
								if(map[pbx+1][pby]==4)
								{
									map[pbx][pby]=0;
									map[pbx+1][pby]=5;
								}
								else
								{
									map[pbx][pby]=0;
									map[pbx+1][pby]=3;
								}
								break;
							case 2:
								if(map[pbx][pby-1]==4)
								{
									map[pbx][pby]=0;
									map[pbx][pby-1]=5;
								}
								else
								{
									map[pbx][pby]=0;
									map[pbx][pby-1]=3;
								}
								break;
							case 3:
								if(map[pbx-1][pby]==4)
								{
									map[pbx][pby]=0;
									map[pbx-1][pby]=5;
								}
								else
								{
									map[pbx][pby]=0;
									map[pbx-1][pby]=3;
								}
						}
						movedst[movetimes]--;
					}
					drawback();
                    refresh=0;
				}
			}
            else iswin();
            break;
        case 4:
			clearInterval(interval);
            alert("win");
            window.location.href="/ChildrenProgramming/SaveProgress?progress=11";
    }

}

/*function Move(event)
{
    //alert(1);substr(3,7)lines[i].match("step")
}*/
function test()//对于玩家提交的代码是否语法正确进行判断，并且对只要提交代码就需要重新赋值的变量进行重新赋值，并在代码判定成功之后为游戏运行做准备
{
    var k=0;
    var c=0;//测试用变量
    var num;
    var text = document.getElementById("code");
    var lines = text.value.split("\n");
	stepnum=0;
	movelength=0;
	direction=0;
    for(var i=0;i<lines.length;i++)
	{
		if(lines[i].match("step -"))
		{
			movedrt[movelength]=direction;
			movedst[movelength++]=stepnum;
			direction=(direction+2)%4;
			stepnum=0;
			
			num=lines[i].indexOf("step");
			if(/[0-9]/.test(lines[i]))
			{
                k=parseInt(lines[i].substr(num+4));
                stepnum=stepnum-k;
                c++;
            }
			else
			{
				alert("请输入正确代码");
				return;
			}
		}
        else if(lines[i].match("step"))
		{
            num=lines[i].indexOf("step");
            //gamestate=1;
            if(/[0-9]/.test(lines[i]))
			{
                k=parseInt(lines[i].substr(num+4));
                stepnum=stepnum+k;
                c++;
            }
            else
			{
                for(var j=0;j<lines[i].length;j++)
				{
                    var a=lines[i].indexOf("step",0);
                    if(a!=-1&&lines[i].indexOf("step",j)!=lines[i].indexOf("step",j-1))
					{
						stepnum++;
                    }
                }
            }
        }
		else if(lines[i].match("turn left")&&lines[i].replace(/ /g,"").length==8)
		{
			movedrt[movelength]=direction;
			movedst[movelength++]=stepnum;
			direction=(direction+3)%4;
			stepnum=0;
		}
		else if(lines[i].match("turn right")&&lines[i].replace(/ /g,"").length==9)
		{
			movedrt[movelength]=direction;
			movedst[movelength++]=stepnum;
			direction=(direction+1)%4;
			stepnum=0;
		}
		else if(lines[i].match(" times")&&lines[i].substr(lines[i].indexOf("times")+5).replace(/ /g,"").length==0&&/[0-9]/.test(lines[i]))
		{
			looplevel=0;
			loopnum=looplevel;
			looptimes[looplevel]=parseInt(lines[i]);
			loopstart[looplevel]=i+1;
			loopend[looplevel++]=0;//非最终值
			for(num=i+1;num<lines.length;num++)
			{
				if(lines[num].match(" times")&&lines[num].substr(lines[num].indexOf("times")+5).replace(/ /g,"").length==0&&/[0-9]/.test(lines[num]))
				{
					loopnum=looplevel;
					looptimes[looplevel]=parseInt(lines[num]);
					loopstart[looplevel]=num+1;
					loopend[looplevel++]=0;//非最终值
				}
				else if(lines[num].match("end")&&lines[num].replace(/ /g,"").length==3)
				{
					while(loopend[loopnum]>0)
					{
						loopnum--;
					}
					loopend[loopnum]=num;
					if(loopnum<1) break;
				}
			}
			if(num>=lines.length||execLoop(0)==false)
			{
				alert("请输入正确代码");
				return;
			}
			i=num;
		}
		else if(lines[i].replace(/ /g,"").length==0)
		{
			//空语句所以啥都没执行
		}
        else
		{
            alert("请输入正确代码");
			return;
        }
    }
    //alert(c);
    //alert(t);
    //alert(count);
	gamestate=1;
	movedrt[movelength]=direction;
	movedst[movelength++]=stepnum;
	movetimes=0;
}

function execLoop(n)//识别该循环体内的语句是否符合要求，返回true则语法无问题
{
	var k=0;
    var c=0;//测试用变量
    var num;
	var text = document.getElementById("code");
    var lines = text.value.split("\n");
	for(let j=0;j<looptimes[n];j++)
	{
		for(let i=loopstart[n];i<loopend[n];i++)
		{
			if(n+1<looplevel&&i+1==loopstart[n+1])
			{
				if(execLoop(n+1)==false)
				{
					return false;
				}
				i=loopend[n+1];
			}
			else if(lines[i].match("step -"))
			{
				movedrt[movelength]=direction;
				movedst[movelength++]=stepnum;
				direction=(direction+2)%4;
				stepnum=0;
				
				num=lines[i].indexOf("step");
				if(/[0-9]/.test(lines[i]))
				{
					k=parseInt(lines[i].substr(num+4));
					stepnum=stepnum-k;
					c++;
				}
				else
				{
					return false;
				}
			}
			else if(lines[i].match("step"))
			{
				num=lines[i].indexOf("step");
				//gamestate=1;
				if(/[0-9]/.test(lines[i]))
				{
					k=parseInt(lines[i].substr(num+4));
					stepnum=stepnum+k;
					c++;
				}
				else
				{
					for(var j=0;j<lines[i].length;j++)
					{
						var a=lines[i].indexOf("step",0);
						if(a!=-1&&lines[i].indexOf("step",j)!=lines[i].indexOf("step",j-1))
						{
							stepnum++;
						}
					}
				}
			}
			else if(lines[i].match("turn left")&&lines[i].replace(/ /g,"").length==8)
			{
				movedrt[movelength]=direction;
				movedst[movelength++]=stepnum;
				direction=(direction+3)%4;
				stepnum=0;
			}
			else if(lines[i].match("turn right")&&lines[i].replace(/ /g,"").length==9)
			{
				movedrt[movelength]=direction;
				movedst[movelength++]=stepnum;
				direction=(direction+1)%4;
				stepnum=0;
			}
			else if(lines[i].replace(/ /g,"").length==0)
			{
				//空语句所以啥都没执行
			}
			else
			{
				return false;
			}
		}
	}
	return true;
}

function drawback()//绘制地图
{
	for (var i = 0; i < maprow; i++)
	{
        for (var j = 0; j < mapcolumn; j++)
		{
			context.drawImage(grass,  squaresize*j , squaresize*i);
		}
	}
	
    for (var i = 0; i < maprow; i++)
	{
        for (var j = 0; j < mapcolumn; j++)
		{
            switch (map[i][j])
			{
				/*case 0:
				case 1:
					context.drawImage(grass,  squaresize*j , squaresize*i);
					break;*/
				
                case 3:
                    context.drawImage(rabbit,  squaresize*j , squaresize*i);
                    pbx = i;
                    pby = j;

                    break;

                case 4:
                    context.drawImage(carrot,  squaresize*j-squaresize/4 , squaresize*i-squaresize/4);
                    break;

                case 5:
                    context.drawImage(rabbit,  squaresize*j , squaresize*i);
                    pbx = i;
                    pby = j;

            }
        }
    }
}

function iswin()//游戏是否胜利的判定
{
    gamestate=4;
	for (var i=0;i<carrotx.length;i++)
	if (map[carrotx[i]][carroty[i]]==4)
	{
		gamestate=1;
		break;
	}
	if(gamestate!=4&&movetimes==movelength)
	{
		clearInterval(interval);
		alert("游戏失败，请重新输入代码");
		Init();
	}
}
function initialized()//将mymap加载进游戏中
{
    for (let i = 0; i < maprow; i++)
	{
        for (let j = 0; j < mapcolumn; j++)
		{
            map[i][j] = mymap[i][j];
        }
    }
}

function drawRect()//在游戏未开始时在地图中做下辅助线
{
    context.strokeStyle="#E8E8E8";
    for(var i=0;i<maprow;++i)
    {
        for(var j=0;j<mapcolumn;++j)
        {
            context.strokeRect(i*squaresize,j*squaresize,squaresize,squaresize);
        }
    }
}

function step()//在代码框中加入step
{
    var text=document.getElementById("code");
    text.value=text.value+"step";
}

function turnLeft()//在代码框中加入turn left
{
    var text=document.getElementById("code");
    text.value=text.value+"turn left";
}

function turnRight()//在代码框中加入turn right
{
    var text=document.getElementById("code");
    text.value=text.value+"turn right";
}

function timesEnd()//在代码框中加入times...end循环语句
{
	var text=document.getElementById("code");
    text.value=text.value+" times\n\nend";
}

function switchHint()//开关提示
{
	if(hinton==0)
	{
		hinton=1;
		document.getElementById("button_switchHint").innerHTML="关闭提示";
		document.getElementById("about").innerHTML="如果对二重循环的用法有疑问，可以回到上一关再认真复习一下";
	}
	else
	{
		hinton=0;
		document.getElementById("button_switchHint").innerHTML="提示";
		document.getElementById("about").innerHTML="二重循环的功用很神奇，但也更难了，试着自己使用二重循环拿到全部萝卜吧~";
	}
}

function returnTop()//返回首页
{
	var r=confirm("确定要返回首页吗？");
	if(r==true)
	{
		window.location.href="level_1_1.html";
	}
}