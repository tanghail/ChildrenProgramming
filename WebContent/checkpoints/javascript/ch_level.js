function check() {
    var level = document.getElementsByName("radio");
    for(var i=0;i<level.length;i++)
    {
        //判断那个单选按钮为选中状态
        if(level[i].checked)
        {
            //弹出选中单选按钮的值

            switch (i) {
                case 0:
                    window.location.href="/ChildrenProgramming/StartGame?progress=" +(i+1);
                    break;
                case 1:
                    window.location.href="/ChildrenProgramming/StartGame?progress="+ (i+1);
                    break;
                case 2:
                    window.location.href="/ChildrenProgramming/StartGame?progress="+ (i+1);
                    break;
                case 3:
                    window.location.href="/ChildrenProgramming/StartGame?progress="+ (i+1);
                    break;
                case 4:
                    window.location.href="/ChildrenProgramming/StartGame?progress="+ (i+1);
                    break;
                case 5:
                    window.location.href="/ChildrenProgramming/StartGame?progress="+ (i+1);
                    break;
                case 6:
                    window.location.href="/ChildrenProgramming/StartGame?progress=7";
                    break;
                case 7:
                    window.location.href="/ChildrenProgramming/StartGame?progress=8";
                    break;
                case 8:
                    window.location.href="/ChildrenProgramming/StartGame?progress=9";
                    break;
                case 9:
                    window.location.href="/ChildrenProgramming/StartGame?progress=10";
                    break;
                case 10:
                    window.location.href="/ChildrenProgramming/StartGame?progress=11";
                    break;
                case 11:
                    window.location.href="/ChildrenProgramming/StartGame?progress=12";
                    break;
            }
        }
    }
}
function back(){
	window.location.href="level_1_1.html"
}