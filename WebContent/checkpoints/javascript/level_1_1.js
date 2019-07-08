window.onload = PreInit;
window.onkeydown = KeyUp;
var hinton;//玩家是否开了提示，1表示开了
var context;//获取画布
var back;//背景
var grass;//草地图片
var rabbit;//兔子图片
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
	var num=0;//胡萝卜数量
	for(var i=0;i<maprow;i++)
	for(var j=0;j<mapcolumn;j++)
	if(mymap[i][j]==4)
	{
		carrotx[num]=i;
		carroty[num]=j;
		num++;
	}
	document.getElementById("code").innerHTML="";
	Init();
}
function Init()
{
    var canvas = document.getElementById("game");
    context = canvas.getContext("2d");
    back = LoadImage("resource/background.jpg");
	grass = LoadImage("resource/grass.png");
    rabbit = LoadImage("resource/rabbit_right.png");
    carrot = LoadImage("resource/carrot.png");
    //interval = setInterval(GameLoop,1000/60);
    gamestate=0;
    //m=0;
    stepnum=0;
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
			if(stepnum>0)
			{
                refresh++;
                if(refresh>maxrefresh)
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
            }
			else iswin();
            break;
        case 4:
			clearInterval(interval);
            alert("win");
			window.location.href="level_1_2.html";

    }

}

/*function Move(event)
{
    //alert(1);substr(3,7)lines[i].match("step")
}*/
function test()
{
    var k=0;
    var count=0;
    var c=0;
    var num;
    var text = document.getElementById("code");
    var lines = text.value.split("\n");
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
                        count++;
                    }
                }
            }
        }
		else if(lines[i].replace(/ /g,"").length==0)
		{
			//空语句所以啥都没执行
		}
        else
		{
            alert("请输入正确代码");
			stepnum=0;
			return;
        }
    }
    //alert(c);
    //alert(t);
    //alert(count);
	gamestate=1;
    stepnum=stepnum+count;
    var form = document.forms[0];
    form.action="/ChildrenProgramming/GameEnd?progress=1";
    form.method="post";
    form.submit();
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
    /*for (var i = 0; i < maprow; i++)
	{
        for (var j = 0; j < mapcolumn; j++)
		{
            if (map[i][j] == 5)
            { gamestate=4; }
        }
    }*/
	gamestate=4;
	for (var i=0;i<carrotx.length;i++)
	if (map[carrotx[i]][carroty[i]]==4)
	{
		gamestate=1;
		break;
	}
	if(gamestate!=4&&stepnum==0)
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
    var step=document.getElementById("code");
    step.value=step.value+"step";
    
}

function switchHint()
{
	if(hinton==0)
	{
		hinton=1;
		document.getElementById("button_switchHint").innerHTML="关闭提示";
		document.getElementById("about").innerHTML="点击step或输入step，并在后面添加步数";
	}
	else
	{
		hinton=0;
		document.getElementById("button_switchHint").innerHTML="提示";
		document.getElementById("about").innerHTML="通过移动的方式拿到萝卜吧~";
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
//-------------------------------游戏整体现存问题-----------------------------------//
//1、整个游戏界面需要更加美化，游戏资源需要统一替换。（游戏界面的控件位置和控件尺寸也可能需要跟着修改，随之可能加参数）
//2、暂时用alert()代替的游戏弹窗需要统一换成自定义风格，自定义弹窗可能还需要增加更多控件，如返回首页，重玩本关，进入下一关等等。
//3、需要加上返回首页（或者设置之类的）按钮。（也可能需要关闭/显示提示按钮）
//4、需要加入剧情对话。
//5、需要在后期加入与数据库和网站的对接。
//6、程序语句的判定需要考虑更多情况（step 4a,step 4.5也是合法语句）。
//7、游戏的过界判定需要完善。
//8、先画背景再画边框，加上草地图片，movedrt和movedst重新初始化（已解决）
//9、需要同时显示草地和其他物品。（已解决）
//10、屏幕的刷新速率需要调整。（暂时解决）
//11、返回首页功能记得修改返回的目标位置。
//12、空语句判定。（已解决）
//13、错误判定一次之后下一次的代码结果会因为前一次残留的数据有所偏差（movedrt,movedst,direction）。（已解决）
//14、每个关卡的提示和关闭提示文本需要重新设计。（已解决）
//15、谷歌浏览器无法运行游戏。

//-------------------------------地图元素讯息备注-----------------------------------//
//0：草地背景     1：边界（暂定为草地）     2：障碍物石头     3：小兔子       4：胡萝卜（可能是别的任务目标）    5：完成的任务目标
//