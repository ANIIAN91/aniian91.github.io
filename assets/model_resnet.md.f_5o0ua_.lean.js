import{_ as o,c as a,k as t,a as l,R as i,o as e}from"./chunks/framework.C6kDZlj-.js";const R=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"model/resnet.md","filePath":"model/resnet.md","lastUpdated":1733408065000}'),r={name:"model/resnet.md"},s=t("h3",{id:"_1-该模型的结构",tabindex:"-1"},[l("1. 该模型的结构 "),t("a",{class:"header-anchor",href:"#_1-该模型的结构","aria-label":'Permalink to "1. 该模型的结构"'},"​")],-1),n=t("p",null,[t("strong",null,"ResNet"),l("（Residual Network，残差网络）是由 Kaiming He 等人在 2015 年提出的一种深度卷积神经网络，通过引入 "),t("strong",null,"残差连接"),l(" 解决深层网络中的梯度消失和退化问题。")],-1),Q=t("h4",{id:"结构特点",tabindex:"-1"},[t("strong",null,"结构特点"),l(),t("a",{class:"header-anchor",href:"#结构特点","aria-label":'Permalink to "**结构特点**"'},"​")],-1),h=t("strong",null,"残差块（Residual Block）",-1),d=t("li",null,[l("核心是 "),t("strong",null,"跳跃连接（Shortcut Connection）"),l("。")],-1),T={class:"MathJax",jax:"SVG",display:"true",style:{direction:"ltr",display:"block","text-align":"center",margin:"1em 0",position:"relative"}},u={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.566ex"},xmlns:"http://www.w3.org/2000/svg",width:"16.889ex",height:"2.262ex",role:"img",focusable:"false",viewBox:"0 -750 7465 1000","aria-hidden":"true"},g=i("",1),m=[g],c=t("mjx-assistive-mml",{unselectable:"on",display:"block",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",overflow:"hidden",width:"100%"}},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},[t("mi",null,"H"),t("mo",{stretchy:"false"},"("),t("mi",null,"x"),t("mo",{stretchy:"false"},")"),t("mo",null,"="),t("mi",null,"F"),t("mo",{stretchy:"false"},"("),t("mi",null,"x"),t("mo",{stretchy:"false"},")"),t("mo",null,"+"),t("mi",null,"x")])],-1),_=t("li",null,"其中，( F(x) ) 是学习的残差，( x ) 是输入，( H(x) ) 是输出。",-1),p=t("li",null,[t("strong",null,"堆叠结构"),l("： "),t("ul",null,[t("li",null,"多个残差块堆叠，构成更深的网络。")])],-1),x=t("li",null,[t("strong",null,"瓶颈块（Bottleneck Block）"),l("： "),t("ul",null,[t("li",null,"对于深层网络，通过 ( 1 \\times 1 ) 卷积减少维度，降低计算量。")])],-1),b=i("",44);function H(f,k,q,P,w,y){return e(),a("div",null,[s,n,Q,t("ul",null,[t("li",null,[h,l("： "),t("ul",null,[d,t("li",null,[l("每个残差块直接将输入与经过两次卷积的特征相加："),t("mjx-container",T,[(e(),a("svg",u,m)),c])]),_])]),p,x]),b])}const L=o(r,[["render",H]]);export{R as __pageData,L as default};