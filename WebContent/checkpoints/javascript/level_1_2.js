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

function PreInit()
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
function Init()
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
function GameLoop()
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
			window.location.href="level_1_3.html";
    }

}

/*function Move(event)
{
    //alert(1);substr(3,7)lines[i].match("step")
}*/
function test()
{
    var k=0;
    var c=0;
    var num;
    var text = document.getElementById("code");
    var lines = text.value.split("\n");
	stepnum=0;
	movelength=0;
	direction=0;
    for(var i=0;i<lines.length;i++)
	{
        if(lines[i].match("step")&&!(lines[i].match("step -")))
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

function iswin()
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
function initialized()
{
    for (let i = 0; i < maprow; i++)
	{
        for (let j = 0; j < mapcolumn; j++)
		{
            map[i][j] = mymap[i][j];
        }
    }
}

function drawRect()
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

function step()
{
    var text=document.getElementById("code");
    text.value=text.value+"step";
}

function turnLeft()
{
    var text=document.getElementById("code");
    text.value=text.value+"turn left";
}

function turnRight()
{
    var text=document.getElementById("code");
    text.value=text.value+"turn right";
}

function switchHint()
{
	if(hinton==0)
	{
		hinton=1;
		document.getElementById("button_switchHint").innerHTML="关闭提示";
		document.getElementById("about").innerHTML="点击turn left/right或输入turn left/right语句可以使得小兔子转变前进方向";
	}
	else
	{
		hinton=0;
		document.getElementById("button_switchHint").innerHTML="提示";
		document.getElementById("about").innerHTML="通过移动和转弯的方式拿到萝卜吧~";
	}
}

function returnTop()
{
	var r=confirm("确定要返回首页吗？");
	if (r==true)
	{
		window.location.href="level_1_1.html";
	}
}