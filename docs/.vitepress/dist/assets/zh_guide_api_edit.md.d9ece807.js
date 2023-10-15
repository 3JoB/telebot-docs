import{_ as s,c as a,o as n,Q as p}from"./chunks/framework.31184730.js";const u=JSON.parse('{"title":"编辑","description":"","frontmatter":{"title":"编辑","page":"doc"},"headers":[],"relativePath":"zh/guide/api/edit.md","filePath":"zh/guide/api/edit.md","lastUpdated":null}'),l={name:"zh/guide/api/edit.md"},e=p(`<h1 id="编辑" tabindex="-1">编辑 <a class="header-anchor" href="#编辑" aria-label="Permalink to &quot;编辑&quot;">​</a></h1><p>如果您想编辑某些现有消息，则实际上不需要存储原始对象。 事实上，编辑后，Telegram 只需要和。所以你并不真正需要整个消息。</p><p>另外，您可能希望在数据库中存储对某些消息的引用，因此我认为任何Go结构都可以作为 Telegram 消息进行编辑，以实现:<code>*Message</code> <code>chat_id</code> <code>message_id</code> <code>Editable</code></p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// Editable is an interface for all objects that</span></span>
<span class="line"><span style="color:#6A737D;">// provide &quot;message signature&quot;, a pair of 32-bit</span></span>
<span class="line"><span style="color:#6A737D;">// message ID and 64-bit chat ID, both required</span></span>
<span class="line"><span style="color:#6A737D;">// for edit operations.</span></span>
<span class="line"><span style="color:#6A737D;">//</span></span>
<span class="line"><span style="color:#6A737D;">// Use case: DB model struct for messages to-be</span></span>
<span class="line"><span style="color:#6A737D;">// edited with, say two columns: msg_id,chat_id</span></span>
<span class="line"><span style="color:#6A737D;">// could easily implement MessageSig() making</span></span>
<span class="line"><span style="color:#6A737D;">// instances of stored messages editable.</span></span>
<span class="line"><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Editable</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// MessageSig is a &quot;message signature&quot;.</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">//</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// For inline messages, return chatID = 0.</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">MessageSig</span><span style="color:#E1E4E8;">() (messageID </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;">, chatID </span><span style="color:#F97583;">int64</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// Editable is an interface for all objects that</span></span>
<span class="line"><span style="color:#6A737D;">// provide &quot;message signature&quot;, a pair of 32-bit</span></span>
<span class="line"><span style="color:#6A737D;">// message ID and 64-bit chat ID, both required</span></span>
<span class="line"><span style="color:#6A737D;">// for edit operations.</span></span>
<span class="line"><span style="color:#6A737D;">//</span></span>
<span class="line"><span style="color:#6A737D;">// Use case: DB model struct for messages to-be</span></span>
<span class="line"><span style="color:#6A737D;">// edited with, say two columns: msg_id,chat_id</span></span>
<span class="line"><span style="color:#6A737D;">// could easily implement MessageSig() making</span></span>
<span class="line"><span style="color:#6A737D;">// instances of stored messages editable.</span></span>
<span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Editable</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// MessageSig is a &quot;message signature&quot;.</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">//</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// For inline messages, return chatID = 0.</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">MessageSig</span><span style="color:#24292E;">() (messageID </span><span style="color:#D73A49;">int</span><span style="color:#24292E;">, chatID </span><span style="color:#D73A49;">int64</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>例如，类型为可编辑。以下是Telebot提供的type实现:</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// StoredMessage is an example struct suitable for being</span></span>
<span class="line"><span style="color:#6A737D;">// stored in the database as-is or being embedded into</span></span>
<span class="line"><span style="color:#6A737D;">// a larger struct, which is often the case (you might</span></span>
<span class="line"><span style="color:#6A737D;">// want to store some metadata alongside, or might not.)</span></span>
<span class="line"><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">StoredMessage</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	MessageID </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">\`sql:&quot;message_id&quot; json:&quot;message_id&quot;\`</span></span>
<span class="line"><span style="color:#E1E4E8;">	ChatID    </span><span style="color:#F97583;">int64</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`sql:&quot;chat_id&quot; json:&quot;chat_id&quot;\`</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (x StoredMessage) </span><span style="color:#B392F0;">MessageSig</span><span style="color:#E1E4E8;">() (</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">int64</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> x.MessageID, x.ChatID</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// StoredMessage is an example struct suitable for being</span></span>
<span class="line"><span style="color:#6A737D;">// stored in the database as-is or being embedded into</span></span>
<span class="line"><span style="color:#6A737D;">// a larger struct, which is often the case (you might</span></span>
<span class="line"><span style="color:#6A737D;">// want to store some metadata alongside, or might not.)</span></span>
<span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">StoredMessage</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	MessageID </span><span style="color:#D73A49;">int</span><span style="color:#24292E;">   </span><span style="color:#032F62;">\`sql:&quot;message_id&quot; json:&quot;message_id&quot;\`</span></span>
<span class="line"><span style="color:#24292E;">	ChatID    </span><span style="color:#D73A49;">int64</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`sql:&quot;chat_id&quot; json:&quot;chat_id&quot;\`</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> (x StoredMessage) </span><span style="color:#6F42C1;">MessageSig</span><span style="color:#24292E;">() (</span><span style="color:#D73A49;">int</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">int64</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> x.MessageID, x.ChatID</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>何必呢？好吧，它允许您执行以下操作:</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// just two integer columns in the database</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> msgs []tele.StoredMessage</span></span>
<span class="line"><span style="color:#E1E4E8;">db.</span><span style="color:#79B8FF;">Find</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">msgs) </span><span style="color:#6A737D;">// gorm syntax</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> _, msg </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">range</span><span style="color:#E1E4E8;"> msgs {</span></span>
<span class="line"><span style="color:#E1E4E8;">	bot.</span><span style="color:#79B8FF;">Edit</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">msg, </span><span style="color:#9ECBFF;">&quot;Updated text&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// or</span></span>
<span class="line"><span style="color:#E1E4E8;">	bot.</span><span style="color:#79B8FF;">Delete</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">msg)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// just two integer columns in the database</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> msgs []tele.StoredMessage</span></span>
<span class="line"><span style="color:#24292E;">db.</span><span style="color:#005CC5;">Find</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">msgs) </span><span style="color:#6A737D;">// gorm syntax</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> _, msg </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">range</span><span style="color:#24292E;"> msgs {</span></span>
<span class="line"><span style="color:#24292E;">	bot.</span><span style="color:#005CC5;">Edit</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">msg, </span><span style="color:#032F62;">&quot;Updated text&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// or</span></span>
<span class="line"><span style="color:#24292E;">	bot.</span><span style="color:#005CC5;">Delete</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">msg)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>我发现它非常整洁。 值得注意的是，此时Edit系列中还存在另一种方法，这种方法的用途相当罕见，因此我没有费心将其包含到其中，就像我所做的那样，因为它不可避免地会导致不必要的复杂化。<code>EditCaption()</code> <code>Edit()</code> <code>SendAlbum()</code></p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> m </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">Message</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// change caption of a photo, audio, etc.</span></span>
<span class="line"><span style="color:#E1E4E8;">bot.</span><span style="color:#79B8FF;">EditCaption</span><span style="color:#E1E4E8;">(m, </span><span style="color:#9ECBFF;">&quot;new caption&quot;</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> m </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">Message</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// change caption of a photo, audio, etc.</span></span>
<span class="line"><span style="color:#24292E;">bot.</span><span style="color:#005CC5;">EditCaption</span><span style="color:#24292E;">(m, </span><span style="color:#032F62;">&quot;new caption&quot;</span><span style="color:#24292E;">)</span></span></code></pre></div>`,10),o=[e];function t(c,r,i,y,E,d){return n(),a("div",null,o)}const m=s(l,[["render",t]]);export{u as __pageData,m as default};
