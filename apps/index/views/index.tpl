<!--{include './header'}-->
<!--{var obj={a: 123, b: 456}}-->

<h1>It works! <!--{=Date.now() | date:'Y-m-d'}--></h1>
<fieldset>
    <legend><!--{=t.docHd}--> : </legend>
    <section>
        <!--{=t.docCont | truncate:3}-->
    </section>
    <section>
        <!--{=t.sss || '<span>This content has not used html filter</span>'}-->
        <br>
        <!--{=t.sss || '<span>This content has been used html filter</span>' | html}-->
    </section>
    <ul>
        <!--{each i it in t.arr}-->
        <li <!--{if i == 'bb'}--> style="color: #f30" <!--{elseif i == 'cc'}--> style="color: #0f0" <!--{/if}-->><!--{=i}--> -> <!--{=it}--></li>
        <!--{/each}-->
    </ul>
    <dl>
        <!--{each i item in obj}-->
        <dt><span style="color:#09f" ><!--{=i}--> </span><span><!--{=item}--></span></dt>
        <!--{/each}-->
    </dl>
</fieldset>
    
</body>
</html>