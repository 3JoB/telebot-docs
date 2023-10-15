import{_ as s,c as n,o as a,Q as l}from"./chunks/framework.31184730.js";const d=JSON.parse('{"title":"開始製作第一個機器人","description":"","frontmatter":{"title":"開始製作第一個機器人","layout":"doc"},"headers":[],"relativePath":"zh/guide/getting-started.md","filePath":"zh/guide/getting-started.md","lastUpdated":null}'),p={name:"zh/guide/getting-started.md"},o=l(`<h1 id="開始製作第一個機器人" tabindex="-1">開始製作第一個機器人 <a class="header-anchor" href="#開始製作第一個機器人" aria-label="Permalink to &quot;開始製作第一個機器人&quot;">​</a></h1><p>讓我們來看看最小的Telebot範例:</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">log</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">os</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">time</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">tele</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">github.com/3JoB/telebot/v2</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	pref </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> tele.Settings{</span></span>
<span class="line"><span style="color:#E1E4E8;">		Token:  os.</span><span style="color:#79B8FF;">Getenv</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;TOKEN&quot;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">		Poller: </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">tele.LongPoller{Timeout: </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> time.Second},</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	b, err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> tele.</span><span style="color:#79B8FF;">NewBot</span><span style="color:#E1E4E8;">(pref)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		log.</span><span style="color:#79B8FF;">Fatal</span><span style="color:#E1E4E8;">(err)</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">return</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	b.</span><span style="color:#79B8FF;">Handle</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/hello&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">func</span><span style="color:#E1E4E8;">(c </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">tele.Context) </span><span style="color:#F97583;">error</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		c.</span><span style="color:#79B8FF;">Send</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Hello!&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span></span>
<span class="line"><span style="color:#E1E4E8;">	})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	b.</span><span style="color:#79B8FF;">Start</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">log</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">os</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">time</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">tele</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">github.com/3JoB/telebot/v2</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	pref </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> tele.Settings{</span></span>
<span class="line"><span style="color:#24292E;">		Token:  os.</span><span style="color:#005CC5;">Getenv</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;TOKEN&quot;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">		Poller: </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">tele.LongPoller{Timeout: </span><span style="color:#005CC5;">10</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> time.Second},</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	b, err </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> tele.</span><span style="color:#005CC5;">NewBot</span><span style="color:#24292E;">(pref)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		log.</span><span style="color:#005CC5;">Fatal</span><span style="color:#24292E;">(err)</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">return</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	b.</span><span style="color:#005CC5;">Handle</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/hello&quot;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">func</span><span style="color:#24292E;">(c </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">tele.Context) </span><span style="color:#D73A49;">error</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		c.</span><span style="color:#005CC5;">Send</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Hello!&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span></span>
<span class="line"><span style="color:#24292E;">	})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	b.</span><span style="color:#005CC5;">Start</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>怎麼樣?是不是很簡單?Telebot的路由系統負責提供更新到它們的端點，所以為了處理任何有意義的事件， 您所要做的就是將您的功能插入Telebot提供的功能之一端點.您可以在<a href="https://godoc.org/github.com/3JoB/telebot/v2#pkg-constants" target="_blank" rel="noreferrer">此處</a>找到完整清單.</p><p>有幾十個受支援的端點(請參閱包常數). 讓我知道如果您希望看到一些終結點或終結點想法實現.</p><p>這個系統是完全可擴展的，所以我可以在不中斷的情況下引入它們向後相容性.</p>`,6),e=[o];function t(c,r,E,y,i,F){return a(),n("div",null,e)}const C=s(p,[["render",t]]);export{d as __pageData,C as default};
