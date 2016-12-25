<!--{include './header'}-->
<!--{var obj={a: 123, b: 456}}-->
<!--{var arr2=[2,4,6]}-->

<h1>It works! <!--{=Date.now() | date:'Y-m-d'}--></h1>
<fieldset>
    <legend><!--{=docHd}--> : </legend>
    <section>
        <!--{=docCont | truncate:5}-->
    </section>
    <section>
        <!--{=docCont}-->
    </section>
    <section>
        <!--{=docCont.sss || '<span>This content has not used html filter</span>'}-->
        <br>
        <!--{=docCont.sss || '<span>This content has been used html filter</span>' | html}-->
    </section>
    <ul>
        <!--{each i it in arr}-->
        <li <!--{if i == 'bb'}--> style="color: #f30" <!--{elseif i == 'cc'}--> style="color: #0f0" <!--{/if}-->><!--{=i}--> -> 
            <ul>
                <!--{each j el in it}-->
                <li><!--{=j}--> - <!--{=el}--></li>
                <!--{/each}-->
            </ul>
        </li>
        <!--{/each}-->
    </ul>
    <dl>
        <!--{each i it in obj}-->
        <dt><span style="color:#09f" ><!--{=i}--> </span><span><!--{=it}--></span></dt>
        <!--{/each}-->
    </dl>
    <dl>
        <!--{each i in arr2}-->
            <!--{=i}--> 
        <!--{/each}-->
    </dl>
</fieldset>
    
</body>
</html>