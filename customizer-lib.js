jQuery(function(){$(".product-customizer-btn").on("click",function(){const s=$(this).data("product-customizer-product-handle"),i=$(this).data("shop-currency");let e=Math.random().toString(36).substr(2,9);$(this).data("product-customizer-uniq",e),$("body").append(`<product-customizer product_handle="${s}" id="${e}" currency="${i}"></product-customizer>`)}),$(document).on("click",".cart-item__edit",function(){const s=$(this).data("cart-item-key"),i=$(this).data("cart-item-id"),e=$(this).data("product-customizer-product-handle"),a=$(this).data("product-customizer-product-section-id"),d=$(this).data("shop-currency");let t=Math.random().toString(36).substr(2,9);$("body").append(`<product-customizer product_handle="${e}" id="${t}" sections="${a}" cart_item_key="${s}" cart_item_id="${i}" currency="${d}"></product-customizer>`)}),$(document).on("click",".cart-item__remove",async function(s){s.preventDefault(),$(this).attr("disabled",!0).css("cursor","not-allowed").css("pointer-events","none").html("<i class='fa-spin fas fa-spinner'></i>");const i=$(this).data("cart-item-id");await window.theme.cart.store.getState().removeCustomProduct(i),$(this).html("<i class='fa-solid fa-check'></i>")}),setTimeout(()=>{window.theme.cart.store.getState().sync()},200)});const m=window.fetch,h=async(s,i)=>{typeof i<"u"&&(i.headers={...i.headers});try{const e=await m(s,i);if(e.ok){if(["/cart/update.js","/cart.js","/cart/change.js"].map(t=>new RegExp(`^(https?:\\/\\/)?(\\d{1,3}(\\.\\d{1,3}){3}(\\:\\d+)?|[\\w.-]+)?${t.replace(/\//g,"\\/")}(\\?.*)?$`)).some(t=>t.test(e.url))){const t=await e.json();let c=t.item_count;return t&&t.items&&(t.items=t.items.map(o=>{const u=o.properties&&o.properties["_Custom Product ID"]||!1,l=o.product_type.indexOf("Producto")!==-1;if(u&&l){let p="";for(let r=0;r<t.items.length;r++)if(t.items[r].properties["_Custom Product ID"]===o.properties["_Custom Product ID"]&&t.items[r].product_type.indexOf("Producto")===-1){if(t.items[r].properties&&t.items[r].properties.precio){const n=parseInt(t.items[r].properties.precio)*100;t.items[r].final_line_price=n,t.items[r].original_line_price=n,t.total_price+=n}o.final_line_price+=t.items[r].final_line_price,o.original_line_price+=t.items[r].original_line_price,p+=t.items[r].title+"<br>"}o.variant_title=p.trim()}else u&&(c-=o.quantity);return o}),t.item_count=c),new Response(JSON.stringify(t))}else if(e.url.startsWith(window.location.origin+"/recommendations/products.json")&&!e.url.includes("section_id")){const t=await e.json();return t&&t.products&&(t.products=t.products.filter(c=>c.type.indexOf("CTM")===-1)),new Response(JSON.stringify(t))}}else console.log("Response error from:",s);return e}catch(e){throw console.error("Fetch error:",e),e}};window.fetch=h;