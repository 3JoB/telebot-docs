import{_ as s,c as n,o as a,Q as l}from"./chunks/framework.31184730.js";const h=JSON.parse('{"title":"Inline Mode","description":"","frontmatter":{"title":"Inline Mode","layout":"doc"},"headers":[],"relativePath":"guide/api/inline-mode.md","filePath":"guide/api/inline-mode.md","lastUpdated":null}'),p={name:"guide/api/inline-mode.md"},e=l(`<h1 id="inline-mode" tabindex="-1">Inline Mode <a class="header-anchor" href="#inline-mode" aria-label="Permalink to &quot;Inline Mode&quot;">​</a></h1><p>So if you want to handle incoming inline queries you better plug the <code>tele.OnQuery</code> endpoint and then use the <code>Answer()</code> method to send a list of inline queries back. I think at the time of writing, Telebot supports all of the provided result types (but not the cached ones). This is what it looks like:</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">b.</span><span style="color:#79B8FF;">Handle</span><span style="color:#E1E4E8;">(tele.OnQuery, </span><span style="color:#F97583;">func</span><span style="color:#E1E4E8;">(c </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">tele.Context) </span><span style="color:#F97583;">error</span><span style="color:#E1E4E8;"> {</span></span>
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
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p>There&#39;s not much to talk about really. It also supports some form of authentication through deep-linking. For that, use fields <code>SwitchPMText</code> and <code>SwitchPMParameter</code> of <code>QueryResponse</code>.</p>`,4),o=[e];function t(c,r,E,y,i,u){return a(),n("div",null,o)}const m=s(p,[["render",t]]);export{h as __pageData,m as default};
