<!--{include './header'}-->
<!--{var obj={a: 123, b: 456}}-->
<!--{var arr2=[2,4,6]}-->
<!--{var ooo={2: '这是1', 4: '这是6', 6: '这是6'}}-->
<!--{var a='2017-01-12 23:33:33'}-->
<!--{var tt=function(v){
return ooo[v]}
}-->

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
    <div class="menu">
        <!--{each i it in menu}-->
        <ul>
            <li class="name"><!--{=i-0+1}--><!--{=it.name}--></li>
            <li class="sub-name-box">
                <ul>
                    <!--{each sub in it.sub}-->
                    <li class="sub-name"><!--{=i}--><!--{=sub.name}--></li>
                    <!--{/each}-->
                </ul>
            </li>
        </ul>
        <!--{/each}-->
    </div>
    <dl>
        <!--{each i it in obj}-->
        <dt><span style="color:#09f" ><!--{=i}--> </span><span><!--{=it}--></span></dt>
        <!--{/each}-->
    </dl>
    <dl>
        <!--{each i in arr2}-->
            <!--{=tt(i)}--> 
        <!--{/each}-->
        <p>
            <!--{=a | date:Y年m月d日  H:i}-->
        </p>
        
    </dl>
</fieldset>
    
</body>
</html>