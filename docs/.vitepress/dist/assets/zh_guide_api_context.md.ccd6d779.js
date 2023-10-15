import{_ as s,c as n,o as a,Q as l}from"./chunks/framework.31184730.js";const F=JSON.parse('{"title":"上下文","description":"","frontmatter":{"title":"上下文","layout":"doc"},"headers":[],"relativePath":"zh/guide/api/context.md","filePath":"zh/guide/api/context.md","lastUpdated":null}'),p={name:"zh/guide/api/context.md"},o=l(`<h1 id="上下文" tabindex="-1">上下文 <a class="header-anchor" href="#上下文" aria-label="Permalink to &quot;上下文&quot;">​</a></h1><p>上下文是一种特殊类型，它包装了一个巨大的更新结构并表示当前事件的上下文。</p><p>它提供了几个帮助程序，例如: 获取此更新已发送的聊天,无论这是什么样的更新。</p><p>请不要随意调用不该调用的上下文，它有时含有大量的未初始化指针，这将会导致空指针异常。</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">b.</span><span style="color:#79B8FF;">Handle</span><span style="color:#E1E4E8;">(tele.OnText, </span><span style="color:#F97583;">func</span><span style="color:#E1E4E8;">(c </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">tele.Context) </span><span style="color:#F97583;">error</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// All the text messages that weren&#39;t</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// captured by existing handlers.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">		user </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> c.</span><span style="color:#79B8FF;">Sender</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">		text </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> c.</span><span style="color:#79B8FF;">Text</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">	)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// Use full-fledged bot&#39;s functions</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// only if you need a result:</span></span>
<span class="line"><span style="color:#E1E4E8;">	msg, err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> b.</span><span style="color:#79B8FF;">Send</span><span style="color:#E1E4E8;">(user, text)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> err</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// Instead, prefer a context short-hand:</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> c.</span><span style="color:#79B8FF;">Send</span><span style="color:#E1E4E8;">(text)</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">b.</span><span style="color:#79B8FF;">Handle</span><span style="color:#E1E4E8;">(tele.OnChannelPost, </span><span style="color:#F97583;">func</span><span style="color:#E1E4E8;">(c </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">tele.Context) </span><span style="color:#F97583;">error</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// Channel posts only.</span></span>
<span class="line"><span style="color:#E1E4E8;">	msg </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> c.</span><span style="color:#79B8FF;">Message</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">b.</span><span style="color:#79B8FF;">Handle</span><span style="color:#E1E4E8;">(tele.OnPhoto, </span><span style="color:#F97583;">func</span><span style="color:#E1E4E8;">(c </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">tele.Context) </span><span style="color:#F97583;">error</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// Photos only.</span></span>
<span class="line"><span style="color:#E1E4E8;">	photo </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> c.</span><span style="color:#79B8FF;">Message</span><span style="color:#E1E4E8;">().Photo</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">b.</span><span style="color:#79B8FF;">Handle</span><span style="color:#E1E4E8;">(tele.OnQuery, </span><span style="color:#F97583;">func</span><span style="color:#E1E4E8;">(c </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">tele.Context) </span><span style="color:#F97583;">error</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// Incoming inline queries.</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> c.</span><span style="color:#79B8FF;">Answer</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">b.</span><span style="color:#005CC5;">Handle</span><span style="color:#24292E;">(tele.OnText, </span><span style="color:#D73A49;">func</span><span style="color:#24292E;">(c </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">tele.Context) </span><span style="color:#D73A49;">error</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// All the text messages that weren&#39;t</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// captured by existing handlers.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">		user </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> c.</span><span style="color:#005CC5;">Sender</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">		text </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> c.</span><span style="color:#005CC5;">Text</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">	)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// Use full-fledged bot&#39;s functions</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// only if you need a result:</span></span>
<span class="line"><span style="color:#24292E;">	msg, err </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> b.</span><span style="color:#005CC5;">Send</span><span style="color:#24292E;">(user, text)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> err</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// Instead, prefer a context short-hand:</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> c.</span><span style="color:#005CC5;">Send</span><span style="color:#24292E;">(text)</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">b.</span><span style="color:#005CC5;">Handle</span><span style="color:#24292E;">(tele.OnChannelPost, </span><span style="color:#D73A49;">func</span><span style="color:#24292E;">(c </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">tele.Context) </span><span style="color:#D73A49;">error</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// Channel posts only.</span></span>
<span class="line"><span style="color:#24292E;">	msg </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> c.</span><span style="color:#005CC5;">Message</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">b.</span><span style="color:#005CC5;">Handle</span><span style="color:#24292E;">(tele.OnPhoto, </span><span style="color:#D73A49;">func</span><span style="color:#24292E;">(c </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">tele.Context) </span><span style="color:#D73A49;">error</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// Photos only.</span></span>
<span class="line"><span style="color:#24292E;">	photo </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> c.</span><span style="color:#005CC5;">Message</span><span style="color:#24292E;">().Photo</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">b.</span><span style="color:#005CC5;">Handle</span><span style="color:#24292E;">(tele.OnQuery, </span><span style="color:#D73A49;">func</span><span style="color:#24292E;">(c </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">tele.Context) </span><span style="color:#D73A49;">error</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// Incoming inline queries.</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> c.</span><span style="color:#005CC5;">Answer</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">...</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p>Telebot移除了旧的上下文接口并直接暴露出来作为指针来使用。另外，请不要尝试将上下文带到外部，因为它是池化的，在每个处理结束后都会被回收。</p><p>您可以在<a href="https://pkg.go.dev/github.com/3JoB/telebot/v2#pkg-constants" target="_blank" rel="noreferrer">此处</a>找到可用的Handler事件。</p>`,7),e=[o];function t(c,r,E,y,i,d){return a(),n("div",null,e)}const A=s(p,[["render",t]]);export{F as __pageData,A as default};
