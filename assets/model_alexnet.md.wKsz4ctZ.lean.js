import{_ as l,c as a,k as t,a as Q,R as T,o as e}from"./chunks/framework.C6kDZlj-.js";const w2=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"model/alexnet.md","filePath":"model/alexnet.md","lastUpdated":1733709894000}'),s={name:"model/alexnet.md"},o=t("h3",{id:"_1-该模型的结构",tabindex:"-1"},[Q("1. 该模型的结构 "),t("a",{class:"header-anchor",href:"#_1-该模型的结构","aria-label":'Permalink to "1. 该模型的结构"'},"​")],-1),n=t("p",null,[t("strong",null,"AlexNet"),Q(" 是深度学习领域的里程碑，由 Krizhevsky 等人在 2012 年提出，结构如下：")],-1),r=t("strong",null,"输入层",-1),d={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},i={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.05ex"},xmlns:"http://www.w3.org/2000/svg",width:"13.45ex",height:"1.579ex",role:"img",focusable:"false",viewBox:"0 -676 5944.9 698","aria-hidden":"true"},h=T("",1),m=[h],p=t("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("mn",null,"227"),t("mo",null,"×"),t("mn",null,"227"),t("mo",null,"×"),t("mn",null,"3")])],-1),c=t("strong",null,"卷积层",-1),g=t("li",null,"多层卷积操作提取空间特征。",-1),_={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},L={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"0"},xmlns:"http://www.w3.org/2000/svg",width:"7.291ex",height:"1.507ex",role:"img",focusable:"false",viewBox:"0 -666 3222.4 666","aria-hidden":"true"},x=T("",1),u=[x],w=t("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("mn",null,"11"),t("mo",null,"×"),t("mn",null,"11")])],-1),H=T("",4),V=t("hr",null,null,-1),f=t("h3",{id:"_2-该模型实现的过程-图文动画",tabindex:"-1"},[Q("2. 该模型实现的过程（图文动画） "),t("a",{class:"header-anchor",href:"#_2-该模型实现的过程-图文动画","aria-label":'Permalink to "2. 该模型实现的过程（图文动画）"'},"​")],-1),k=t("p",null,"AlexNet 的实现过程可以描述为以下步骤：",-1),M=t("strong",null,"图像预处理",-1),y={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},b={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.05ex"},xmlns:"http://www.w3.org/2000/svg",width:"13.45ex",height:"1.579ex",role:"img",focusable:"false",viewBox:"0 -676 5944.9 698","aria-hidden":"true"},Z=T("",1),v=[Z],D=t("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("mn",null,"227"),t("mo",null,"×"),t("mn",null,"227"),t("mo",null,"×"),t("mn",null,"3")])],-1),C=T("",4),S=t("p",null,"可用动画展示特征图从初始图像到高层语义特征的变化，说明每层的作用。",-1),A=t("hr",null,null,-1),j=t("h3",{id:"_3-该模型的详细架构图",tabindex:"-1"},[Q("3. 该模型的详细架构图 "),t("a",{class:"header-anchor",href:"#_3-该模型的详细架构图","aria-label":'Permalink to "3. 该模型的详细架构图"'},"​")],-1),P=t("p",null,"以下是 AlexNet 的结构简图：",-1),I=t("strong",null,"输入层",-1),R={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},q={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.05ex"},xmlns:"http://www.w3.org/2000/svg",width:"13.45ex",height:"1.579ex",role:"img",focusable:"false",viewBox:"0 -676 5944.9 698","aria-hidden":"true"},N=T("",1),B=[N],O=t("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("mn",null,"227"),t("mo",null,"×"),t("mn",null,"227"),t("mo",null,"×"),t("mn",null,"3")])],-1),G=t("strong",null,"卷积层1",-1),E={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},z={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.05ex"},xmlns:"http://www.w3.org/2000/svg",width:"2.262ex",height:"1.557ex",role:"img",focusable:"false",viewBox:"0 -666 1000 688","aria-hidden":"true"},J=T("",1),X=[J],U=t("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("mn",null,"96")])],-1),K={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},$={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"0"},xmlns:"http://www.w3.org/2000/svg",width:"7.291ex",height:"1.507ex",role:"img",focusable:"false",viewBox:"0 -666 3222.4 666","aria-hidden":"true"},F=T("",1),W=[F],Y=t("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("mn",null,"11"),t("mo",null,"×"),t("mn",null,"11")])],-1),t1={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},Q1={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"0"},xmlns:"http://www.w3.org/2000/svg",width:"1.131ex",height:"1.532ex",role:"img",focusable:"false",viewBox:"0 -677 500 677","aria-hidden":"true"},T1=t("g",{stroke:"currentColor",fill:"currentColor","stroke-width":"0",transform:"scale(1,-1)"},[t("g",{"data-mml-node":"math"},[t("g",{"data-mml-node":"mn"},[t("path",{"data-c":"34",d:"M462 0Q444 3 333 3Q217 3 199 0H190V46H221Q241 46 248 46T265 48T279 53T286 61Q287 63 287 115V165H28V211L179 442Q332 674 334 675Q336 677 355 677H373L379 671V211H471V165H379V114Q379 73 379 66T385 54Q393 47 442 46H471V0H462ZM293 211V545L74 212L183 211H293Z",style:{"stroke-width":"3"}})])])],-1),a1=[T1],e1=t("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("mn",null,"4")])],-1),l1={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},s1={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.05ex"},xmlns:"http://www.w3.org/2000/svg",width:"12.319ex",height:"1.557ex",role:"img",focusable:"false",viewBox:"0 -666 5444.9 688","aria-hidden":"true"},o1=T("",1),n1=[o1],r1=t("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("mn",null,"55"),t("mo",null,"×"),t("mn",null,"55"),t("mo",null,"×"),t("mn",null,"96")])],-1),d1=t("strong",null,"最大池化1",-1),i1={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},h1={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.05ex"},xmlns:"http://www.w3.org/2000/svg",width:"5.028ex",height:"1.554ex",role:"img",focusable:"false",viewBox:"0 -665 2222.4 687","aria-hidden":"true"},m1=T("",1),p1=[m1],c1=t("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("mn",null,"3"),t("mo",null,"×"),t("mn",null,"3")])],-1),g1={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},_1={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"0"},xmlns:"http://www.w3.org/2000/svg",width:"1.131ex",height:"1.507ex",role:"img",focusable:"false",viewBox:"0 -666 500 666","aria-hidden":"true"},L1=t("g",{stroke:"currentColor",fill:"currentColor","stroke-width":"0",transform:"scale(1,-1)"},[t("g",{"data-mml-node":"math"},[t("g",{"data-mml-node":"mn"},[t("path",{"data-c":"32",d:"M109 429Q82 429 66 447T50 491Q50 562 103 614T235 666Q326 666 387 610T449 465Q449 422 429 383T381 315T301 241Q265 210 201 149L142 93L218 92Q375 92 385 97Q392 99 409 186V189H449V186Q448 183 436 95T421 3V0H50V19V31Q50 38 56 46T86 81Q115 113 136 137Q145 147 170 174T204 211T233 244T261 278T284 308T305 340T320 369T333 401T340 431T343 464Q343 527 309 573T212 619Q179 619 154 602T119 569T109 550Q109 549 114 549Q132 549 151 535T170 489Q170 464 154 447T109 429Z",style:{"stroke-width":"3"}})])])],-1),x1=[L1],u1=t("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("mn",null,"2")])],-1),w1={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},H1={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.05ex"},xmlns:"http://www.w3.org/2000/svg",width:"12.319ex",height:"1.579ex",role:"img",focusable:"false",viewBox:"0 -676 5444.9 698","aria-hidden":"true"},V1=T("",1),f1=[V1],k1=t("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("mn",null,"27"),t("mo",null,"×"),t("mn",null,"27"),t("mo",null,"×"),t("mn",null,"96")])],-1),M1=t("strong",null,"卷积层2",-1),y1={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},b1={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.05ex"},xmlns:"http://www.w3.org/2000/svg",width:"3.394ex",height:"1.557ex",role:"img",focusable:"false",viewBox:"0 -666 1500 688","aria-hidden":"true"},Z1=T("",1),v1=[Z1],D1=t("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("mn",null,"256")])],-1),C1={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},S1={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.05ex"},xmlns:"http://www.w3.org/2000/svg",width:"5.028ex",height:"1.557ex",role:"img",focusable:"false",viewBox:"0 -666 2222.4 688","aria-hidden":"true"},A1=T("",1),j1=[A1],P1=t("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("mn",null,"5"),t("mo",null,"×"),t("mn",null,"5")])],-1),I1={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},R1={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.05ex"},xmlns:"http://www.w3.org/2000/svg",width:"13.45ex",height:"1.579ex",role:"img",focusable:"false",viewBox:"0 -676 5944.9 698","aria-hidden":"true"},q1=T("",1),N1=[q1],B1=t("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("mn",null,"27"),t("mo",null,"×"),t("mn",null,"27"),t("mo",null,"×"),t("mn",null,"256")])],-1),O1=t("strong",null,"最大池化2",-1),G1={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},E1={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.05ex"},xmlns:"http://www.w3.org/2000/svg",width:"5.028ex",height:"1.554ex",role:"img",focusable:"false",viewBox:"0 -665 2222.4 687","aria-hidden":"true"},z1=T("",1),J1=[z1],X1=t("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("mn",null,"3"),t("mo",null,"×"),t("mn",null,"3")])],-1),U1={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},K1={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.05ex"},xmlns:"http://www.w3.org/2000/svg",width:"13.45ex",height:"1.557ex",role:"img",focusable:"false",viewBox:"0 -666 5944.9 688","aria-hidden":"true"},$1=T("",1),F1=[$1],W1=t("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("mn",null,"13"),t("mo",null,"×"),t("mn",null,"13"),t("mo",null,"×"),t("mn",null,"256")])],-1),Y1=t("strong",null,"卷积层3-5",-1),t3={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},Q3={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.05ex"},xmlns:"http://www.w3.org/2000/svg",width:"3.394ex",height:"1.581ex",role:"img",focusable:"false",viewBox:"0 -677 1500 699","aria-hidden":"true"},T3=T("",1),a3=[T3],e3=t("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("mn",null,"384")])],-1),l3={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},s3={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.05ex"},xmlns:"http://www.w3.org/2000/svg",width:"3.394ex",height:"1.581ex",role:"img",focusable:"false",viewBox:"0 -677 1500 699","aria-hidden":"true"},o3=T("",1),n3=[o3],r3=t("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("mn",null,"384")])],-1),d3={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},i3={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.05ex"},xmlns:"http://www.w3.org/2000/svg",width:"3.394ex",height:"1.557ex",role:"img",focusable:"false",viewBox:"0 -666 1500 688","aria-hidden":"true"},h3=T("",1),m3=[h3],p3=t("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("mn",null,"256")])],-1),c3={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},g3={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.05ex"},xmlns:"http://www.w3.org/2000/svg",width:"13.45ex",height:"1.557ex",role:"img",focusable:"false",viewBox:"0 -666 5944.9 688","aria-hidden":"true"},_3=T("",1),L3=[_3],x3=t("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("mn",null,"13"),t("mo",null,"×"),t("mn",null,"13"),t("mo",null,"×"),t("mn",null,"256")])],-1),u3=t("strong",null,"全连接层",-1),w3={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},H3={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.05ex"},xmlns:"http://www.w3.org/2000/svg",width:"4.525ex",height:"1.581ex",role:"img",focusable:"false",viewBox:"0 -677 2000 699","aria-hidden":"true"},V3=T("",1),f3=[V3],k3=t("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("mn",null,"4096")])],-1),M3={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},y3={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.05ex"},xmlns:"http://www.w3.org/2000/svg",width:"4.525ex",height:"1.581ex",role:"img",focusable:"false",viewBox:"0 -677 2000 699","aria-hidden":"true"},b3=T("",1),Z3=[b3],v3=t("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("mn",null,"4096")])],-1),D3={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},C3={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.05ex"},xmlns:"http://www.w3.org/2000/svg",width:"4.525ex",height:"1.557ex",role:"img",focusable:"false",viewBox:"0 -666 2000 688","aria-hidden":"true"},S3=T("",1),A3=[S3],j3=t("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("mn",null,"1000")])],-1),P3=T("",18),I3={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},R3={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.05ex"},xmlns:"http://www.w3.org/2000/svg",width:"13.45ex",height:"1.579ex",role:"img",focusable:"false",viewBox:"0 -676 5944.9 698","aria-hidden":"true"},q3=T("",1),N3=[q3],B3=t("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("mn",null,"227"),t("mo",null,"×"),t("mn",null,"227"),t("mo",null,"×"),t("mn",null,"3")])],-1),O3=t("li",null,"归一化：减去均值中心化。",-1),G3=T("",23),E3={class:"MathJax",jax:"SVG",display:"true",style:{direction:"ltr",display:"block","text-align":"center",margin:"1em 0",position:"relative"}},z3={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-2.819ex"},xmlns:"http://www.w3.org/2000/svg",width:"41.418ex",height:"6.74ex",role:"img",focusable:"false",viewBox:"0 -1733 18306.7 2978.9","aria-hidden":"true"},J3=T("",1),X3=[J3],U3=t("mjx-assistive-mml",{unselectable:"on",display:"block",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",overflow:"hidden",width:"100%"}},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},[t("mi",null,"O"),t("mo",{stretchy:"false"},"("),t("mi",null,"i"),t("mo",null,","),t("mi",null,"j"),t("mo",{stretchy:"false"},")"),t("mo",null,"="),t("munderover",null,[t("mo",{"data-mjx-texclass":"OP"},"∑"),t("mrow",{"data-mjx-texclass":"ORD"},[t("mi",null,"m"),t("mo",null,"="),t("mn",null,"0")]),t("mrow",{"data-mjx-texclass":"ORD"},[t("mi",null,"M"),t("mo",null,"−"),t("mn",null,"1")])]),t("munderover",null,[t("mo",{"data-mjx-texclass":"OP"},"∑"),t("mrow",{"data-mjx-texclass":"ORD"},[t("mi",null,"n"),t("mo",null,"="),t("mn",null,"0")]),t("mrow",{"data-mjx-texclass":"ORD"},[t("mi",null,"N"),t("mo",null,"−"),t("mn",null,"1")])]),t("mi",null,"I"),t("mo",{stretchy:"false"},"("),t("mi",null,"i"),t("mo",null,"+"),t("mi",null,"m"),t("mo",null,","),t("mi",null,"j"),t("mo",null,"+"),t("mi",null,"n"),t("mo",{stretchy:"false"},")"),t("mo",null,"⋅"),t("mi",null,"K"),t("mo",{stretchy:"false"},"("),t("mi",null,"m"),t("mo",null,","),t("mi",null,"n"),t("mo",{stretchy:"false"},")")])],-1),K3=T("",13),$3=t("p",null,[t("strong",null,"最大池化（Max Pooling）"),Q("：")],-1),F3=t("li",null,"取窗口内的最大值。",-1),W3=t("li",null,"强调最显著特征。",-1),Y3={class:"MathJax",jax:"SVG",display:"true",style:{direction:"ltr",display:"block","text-align":"center",margin:"1em 0",position:"relative"}},t2={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-1.826ex"},xmlns:"http://www.w3.org/2000/svg",width:"32.892ex",height:"4.611ex",role:"img",focusable:"false",viewBox:"0 -1231 14538.1 2037.9","aria-hidden":"true"},Q2=T("",1),T2=[Q2],a2=t("mjx-assistive-mml",{unselectable:"on",display:"block",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",overflow:"hidden",width:"100%"}},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},[t("mi",null,"O"),t("mo",{stretchy:"false"},"("),t("mi",null,"i"),t("mo",null,","),t("mi",null,"j"),t("mo",{stretchy:"false"},")"),t("mo",null,"="),t("munderover",null,[t("mo",{"data-mjx-texclass":"OP",movablelimits:"true"},"max"),t("mrow",{"data-mjx-texclass":"ORD"},[t("mi",null,"m"),t("mo",null,"="),t("mn",null,"0")]),t("mrow",{"data-mjx-texclass":"ORD"},[t("mi",null,"M"),t("mo",null,"−"),t("mn",null,"1")])]),t("munderover",null,[t("mo",{"data-mjx-texclass":"OP",movablelimits:"true"},"max"),t("mrow",{"data-mjx-texclass":"ORD"},[t("mi",null,"n"),t("mo",null,"="),t("mn",null,"0")]),t("mrow",{"data-mjx-texclass":"ORD"},[t("mi",null,"N"),t("mo",null,"−"),t("mn",null,"1")])]),t("mi",null,"I"),t("mo",{stretchy:"false"},"("),t("mi",null,"i"),t("mo",null,"+"),t("mi",null,"m"),t("mo",null,","),t("mi",null,"j"),t("mo",null,"+"),t("mi",null,"n"),t("mo",{stretchy:"false"},")")])],-1),e2=t("p",null,[t("strong",null,"平均池化（Average Pooling）"),Q("：")],-1),l2=t("li",null,"取窗口内的平均值。",-1),s2=t("li",null,"保留总体趋势。",-1),o2={class:"MathJax",jax:"SVG",display:"true",style:{direction:"ltr",display:"block","text-align":"center",margin:"1em 0",position:"relative"}},n2={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-2.819ex"},xmlns:"http://www.w3.org/2000/svg",width:"40.187ex",height:"6.74ex",role:"img",focusable:"false",viewBox:"0 -1733 17762.7 2978.9","aria-hidden":"true"},r2=T("",1),d2=[r2],i2=t("mjx-assistive-mml",{unselectable:"on",display:"block",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",overflow:"hidden",width:"100%"}},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},[t("mi",null,"O"),t("mo",{stretchy:"false"},"("),t("mi",null,"i"),t("mo",null,","),t("mi",null,"j"),t("mo",{stretchy:"false"},")"),t("mo",null,"="),t("mfrac",null,[t("mn",null,"1"),t("mrow",null,[t("mi",null,"M"),t("mo",null,"×"),t("mi",null,"N")])]),t("munderover",null,[t("mo",{"data-mjx-texclass":"OP"},"∑"),t("mrow",{"data-mjx-texclass":"ORD"},[t("mi",null,"m"),t("mo",null,"="),t("mn",null,"0")]),t("mrow",{"data-mjx-texclass":"ORD"},[t("mi",null,"M"),t("mo",null,"−"),t("mn",null,"1")])]),t("munderover",null,[t("mo",{"data-mjx-texclass":"OP"},"∑"),t("mrow",{"data-mjx-texclass":"ORD"},[t("mi",null,"n"),t("mo",null,"="),t("mn",null,"0")]),t("mrow",{"data-mjx-texclass":"ORD"},[t("mi",null,"N"),t("mo",null,"−"),t("mn",null,"1")])]),t("mi",null,"I"),t("mo",{stretchy:"false"},"("),t("mi",null,"i"),t("mo",null,"+"),t("mi",null,"m"),t("mo",null,","),t("mi",null,"j"),t("mo",null,"+"),t("mi",null,"n"),t("mo",{stretchy:"false"},")")])],-1),h2=T("",11);function m2(p2,c2,g2,_2,L2,x2){return e(),a("div",null,[o,n,t("ul",null,[t("li",null,[r,Q("：接收固定大小的图像，通常为 "),t("mjx-container",d,[(e(),a("svg",i,m)),p]),Q("。")]),t("li",null,[c,Q("： "),t("ul",null,[g,t("li",null,[Q("第一层使用大尺寸卷积核 "),t("mjx-container",_,[(e(),a("svg",L,u)),w]),Q("，随后逐渐减小卷积核大小。")])])]),H]),V,f,k,t("ol",null,[t("li",null,[M,Q("：将输入图像归一化为 "),t("mjx-container",y,[(e(),a("svg",b,v)),D]),Q("。")]),C]),S,A,j,P,t("ul",null,[t("li",null,[I,Q(": "),t("mjx-container",R,[(e(),a("svg",q,B)),O])]),t("li",null,[G,Q(": "),t("mjx-container",E,[(e(),a("svg",z,X)),U]),Q(" 个 "),t("mjx-container",K,[(e(),a("svg",$,W)),Y]),Q(" 卷积核，步长 "),t("mjx-container",t1,[(e(),a("svg",Q1,a1)),e1]),Q("，输出 "),t("mjx-container",l1,[(e(),a("svg",s1,n1)),r1])]),t("li",null,[d1,Q(": "),t("mjx-container",i1,[(e(),a("svg",h1,p1)),c1]),Q("，步长 "),t("mjx-container",g1,[(e(),a("svg",_1,x1)),u1]),Q("，输出 "),t("mjx-container",w1,[(e(),a("svg",H1,f1)),k1])]),t("li",null,[M1,Q(": "),t("mjx-container",y1,[(e(),a("svg",b1,v1)),D1]),Q(" 个 "),t("mjx-container",C1,[(e(),a("svg",S1,j1)),P1]),Q(" 卷积核，输出 "),t("mjx-container",I1,[(e(),a("svg",R1,N1)),B1])]),t("li",null,[O1,Q(": "),t("mjx-container",G1,[(e(),a("svg",E1,J1)),X1]),Q("，输出 "),t("mjx-container",U1,[(e(),a("svg",K1,F1)),W1])]),t("li",null,[Y1,Q(": "),t("mjx-container",t3,[(e(),a("svg",Q3,a3)),e3]),Q(", "),t("mjx-container",l3,[(e(),a("svg",s3,n3)),r3]),Q(", "),t("mjx-container",d3,[(e(),a("svg",i3,m3)),p3]),Q(" 个卷积核，输出 "),t("mjx-container",c3,[(e(),a("svg",g3,L3)),x3])]),t("li",null,[u3,Q(": "),t("mjx-container",w3,[(e(),a("svg",H3,f3)),k3]),Q(", "),t("mjx-container",M3,[(e(),a("svg",y3,Z3)),v3]),Q(", "),t("mjx-container",D3,[(e(),a("svg",C3,A3)),j3])])]),P3,t("ol",null,[t("li",null,[Q("输入：图像大小调整为 "),t("mjx-container",I3,[(e(),a("svg",R3,N3)),B3]),Q("。")]),O3]),G3,t("mjx-container",E3,[(e(),a("svg",z3,X3)),U3]),K3,t("ol",null,[t("li",null,[$3,t("ul",null,[F3,W3,t("li",null,[Q("公式："),t("mjx-container",Y3,[(e(),a("svg",t2,T2)),a2])])])]),t("li",null,[e2,t("ul",null,[l2,s2,t("li",null,[Q("公式："),t("mjx-container",o2,[(e(),a("svg",n2,d2)),i2])])])])]),h2])}const H2=l(s,[["render",m2]]);export{w2 as __pageData,H2 as default};