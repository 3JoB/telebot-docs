import{_ as s,c as n,o as a,Q as l}from"./chunks/framework.31184730.js";const h=JSON.parse('{"title":"内联模式","description":"","frontmatter":{"title":"内联模式","layout":"doc"},"headers":[],"relativePath":"zh/guide/api/inline-mode.md","filePath":"zh/guide/api/inline-mode.md","lastUpdated":null}'),p={name:"zh/guide/api/inline-mode.md"},o=l(`<h1 id="内联模式" tabindex="-1">内联模式 <a class="header-anchor" href="#内联模式" aria-label="Permalink to &quot;内联模式&quot;">​</a></h1><p>因此，如果要处理传入的内联查询，最好插入终结点，然后使用该方法发送内联查询列表 返回。我认为在撰写本文时，Telebot 支持所有提供的结果 类型（但不是缓存的类型）。这是它的样子：tele.OnQueryAnswer()</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">b.</span><span style="color:#79B8FF;">Handle</span><span style="color:#E1E4E8;">(tele.OnQuery, </span><span style="color:#F97583;">func</span><span style="color:#E1E4E8;">(c </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">tele.Context) </span><span style="color:#F97583;">error</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	urls </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> []</span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#9ECBFF;">&quot;http://photo.jpg&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#9ECBFF;">&quot;http://photo2.jpg&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	results </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">make</span><span style="color:#E1E4E8;">(tele.Results, </span><span style="color:#79B8FF;">len</span><span style="color:#E1E4E8;">(urls)) </span><span style="color:#6A737D;">// []tele.Result</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> i, url </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">range</span><span style="color:#E1E4E8;"> urls {</span></span>
<span class="line"><span style="color:#E1E4E8;">		result </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">tele.PhotoResult{</span></span>
<span class="line"><span style="color:#E1E4E8;">			URL:      url,</span></span>
<span class="line"><span style="color:#E1E4E8;">			ThumbURL: url, </span><span style="color:#6A737D;">// required for photos</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		results[i] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> result</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// needed to set a unique string ID for each result</span></span>
<span class="line"><span style="color:#E1E4E8;">		results[i].</span><span style="color:#79B8FF;">SetResultID</span><span style="color:#E1E4E8;">(strconv.</span><span style="color:#79B8FF;">Itoa</span><span style="color:#E1E4E8;">(i))</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> c.</span><span style="color:#79B8FF;">Answer</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">tele.QueryResponse{</span></span>
<span class="line"><span style="color:#E1E4E8;">		Results:   results,</span></span>
<span class="line"><span style="color:#E1E4E8;">		CacheTime: </span><span style="color:#79B8FF;">60</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// a minute</span></span>
<span class="line"><span style="color:#E1E4E8;">	})</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">b.</span><span style="color:#005CC5;">Handle</span><span style="color:#24292E;">(tele.OnQuery, </span><span style="color:#D73A49;">func</span><span style="color:#24292E;">(c </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">tele.Context) </span><span style="color:#D73A49;">error</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	urls </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> []</span><span style="color:#D73A49;">string</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#032F62;">&quot;http://photo.jpg&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#032F62;">&quot;http://photo2.jpg&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	results </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">make</span><span style="color:#24292E;">(tele.Results, </span><span style="color:#005CC5;">len</span><span style="color:#24292E;">(urls)) </span><span style="color:#6A737D;">// []tele.Result</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> i, url </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">range</span><span style="color:#24292E;"> urls {</span></span>
<span class="line"><span style="color:#24292E;">		result </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">tele.PhotoResult{</span></span>
<span class="line"><span style="color:#24292E;">			URL:      url,</span></span>
<span class="line"><span style="color:#24292E;">			ThumbURL: url, </span><span style="color:#6A737D;">// required for photos</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		results[i] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> result</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// needed to set a unique string ID for each result</span></span>
<span class="line"><span style="color:#24292E;">		results[i].</span><span style="color:#005CC5;">SetResultID</span><span style="color:#24292E;">(strconv.</span><span style="color:#005CC5;">Itoa</span><span style="color:#24292E;">(i))</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> c.</span><span style="color:#005CC5;">Answer</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">tele.QueryResponse{</span></span>
<span class="line"><span style="color:#24292E;">		Results:   results,</span></span>
<span class="line"><span style="color:#24292E;">		CacheTime: </span><span style="color:#005CC5;">60</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// a minute</span></span>
<span class="line"><span style="color:#24292E;">	})</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p>真的没什么好谈的。它还支持某种形式的身份验证通过深度链接。为此，请使用字段和 .<code>SwitchPMText</code> <code>SwitchPMParameter</code> <code>QueryResponse</code></p>`,4),e=[o];function t(c,r,E,y,i,u){return a(),n("div",null,e)}const F=s(p,[["render",t]]);export{h as __pageData,F as default};
