import{_ as s,c as n,o as a,Q as l}from"./chunks/framework.31184730.js";const u=JSON.parse('{"title":"Context","description":"","frontmatter":{"title":"Context","layout":"doc"},"headers":[],"relativePath":"guide/api/context.md","filePath":"guide/api/context.md","lastUpdated":null}'),p={name:"guide/api/context.md"},e=l(`<h1 id="context" tabindex="-1">Context <a class="header-anchor" href="#context" aria-label="Permalink to &quot;Context&quot;">​</a></h1><p>Context is a special type that wraps a huge update structure and represents the context of the current event. It provides several helpers, which allow getting, for example, the chat that this update had been sent in, no matter what kind of update this is.</p><p>Please do not call the context that should not be called at will. It sometimes contains a large number of uninitialized pointers, which will cause a null pointer exception.</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">b.</span><span style="color:#79B8FF;">Handle</span><span style="color:#E1E4E8;">(tele.OnText, </span><span style="color:#F97583;">func</span><span style="color:#E1E4E8;">(c </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">tele.Context) </span><span style="color:#F97583;">error</span><span style="color:#E1E4E8;"> {</span></span>
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
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p>Telebot removed the old context interface and exposed it directly as a pointer. Also, please don&#39;t try to take the context outside, as it is pooled and will be recycled after each processing.</p><p>You can find the available Handler events <a href="https://pkg.go.dev/github.com/3JoB/telebot/v2#pkg-constants" target="_blank" rel="noreferrer">here</a>.</p>`,6),o=[e];function t(c,r,E,y,i,d){return a(),n("div",null,o)}const A=s(p,[["render",t]]);export{u as __pageData,A as default};
