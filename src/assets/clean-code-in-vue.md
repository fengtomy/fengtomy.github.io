# clean code in daily work

## 框架模板，在template里比较长的表达式，尽量写到methods或者computed里

``` js
<el-input
  :disabled="
    !schemaCode ||
      look ||
      form.getFieldValue(
        `preCondition.${index}-operator`
      ) === 'EXISTS'
  "
/>

// properly name a new variable or function to express your html template
<a-input
  :disabled="shouldInputDisabled(index)"
/>
methods: {
  shouldInputDisabled(index) {
    const {
      schemaCode,
      look,
      form
    } = this;
    // console.log({ schemaCode, look, form });
    return !schemaCode ||
      look ||
      form.getFieldValue(
        `preCondition.${index}-operator`
      ) === "EXISTS";
  }
}
```

## 更友好的api来优化代码量

``` js
<div
  v-if="
    item.propertyType == 'STRING' ||
      item.propertyType == 'SPU_REF' ||
      item.propertyType == 'SKU_REF'
  "
></div>

<div
  v-if="['STRING', 'SPU_REF', 'SKU_REF'].includes(item.propertyType)"
></div>

// we can use some convenient apis to optimize our functions
// here we leverage Array.prototype.includes to accomplish this work 
<div v-if="validatePropertyType(item.propertyType)"></div>
methods: {
  validatePropertyType(propertyType) {
    return ['STRING', 'SPU_REF', 'SKU_REF'].includes(propertyType);
  }
}
```

## 清晰的代码含义

``` js
code() {
  let code = null;
  this.reportList.length && this.reportList.some(
    rsItem => rsItem.reportName === this.doldFileName.split('-')[0] && rsItem.sheetDtos.some(
      ssItem => {
        if (ssItem.sheetName === this.doldFileName.split('-')[1]) {
          code = ssItem.sheetSqlDto[0].code;
          return true;
        }
        return false;
      }
    )
  );
  return code;
}

// better way
code() {
  const { reportList = [], doldFileName = '' } = this;
  if (!reportList.length) return null;
  const [reportName, sheetName] = doldFileName.split('-');
  const matchedRsItem = reportList.find(
    rsItem => rsItem.reportName === reportName
  );
  if (!matchedRsItem) return null;
  const matchedSsItem = matchedRsItem.find(
    ssItem => ssItem.sheetName === sheetName
  );
  if (!matchedSsItem) return null;
  return matchedSsItem.sheetSqlDto[0].code;
}

<div
  slot="shortCut"
  class="functionBtnBox"
  v-if="branch=='master' && tenantCode !== '123'"
></div>
<div
  slot="shortCut"
  class="functionBtnBox"
  v-if="branch=='sandbox' && tenantCode !== '456'"
></div>
<div
  slot="shortCut"
  class="functionBtnBox"
  v-if="branch =='sit' || branch =='ucloud' || branch =='aws'"
></div>

// better way
<div
  slot="shortCut"
  class="functionBtnBox"
  v-if="blockProd"
></div>
<div
  slot="shortCut"
  class="functionBtnBox"
  v-if="blockSandbox"
></div>
<div
  slot="shortCut"
  class="functionBtnBox"
  v-if="blockOthers"
></div>
computed: {
  blockProd() {
    const { branch, tenantCode } = this;
    return branch==='master' && tenantCode !== '123';
  }
}

if (
  url.indexOf(api.createModel) !== -1 ||
  url.indexOf(api.updateModel) !== -1 ||
  url.indexOf(api.MODEL_DELETE) !== -1 ||
  url.indexOf(api.ADD_TASK) !== -1
) {
  // execute some operations 
}
// 3
const { createModel, updateModel, MODEL_DELETE, ADD_TASK } = api;
const validateOperation = (url) => {
  return [createModel, updateModel, MODEL_DELETE, ADD_TASK].some(
    model => url.indexOf(model) !== -1
  );
}
if (validateOperation(url)) {
  // execute some operations
}
```

## 处理一些多分支问题，优化if条件

``` js
// 1
type == "mini"
  ? this.$store.commit("productList/productCheckChange", {
      type: "splice",
      code: productId,
      version: version
    })
  : this.$store.commit("productList/productCheckChange", {
      type: "add",
      code: productId,
      version: version
    });
// 2
if (text === 19) {
  return "生成";
} else if (text === 45) {
  return "制作";
} else if (text === 46) {
  return "异常";
} else if (text === 49) {
  return "完成";
} else if (text === 50) {
  return "失败";
} else if (text === 6) {
  return "待执行";
} else if (text === 16) {
  return "抽取中";
} else if (text === 17) {
  return "抽取异常";
} else {
  return "导出中";
}
// 3
promotionName: function(value) {
  return value === "11"
    ? "单品"
    : value === "12"
    ? "满减"
    : value === "13"
    ? "满折"
    : value === "14"
    ? "特价"
    : value === "15"
    ? "包邮"
    : value === "16"
    ? "赠品"
    : value === "17"
    ? "捆绑"
    : "满送";
}
// 4
const propMap = {
  "01": "limitSumTimes",
  "02": "limitTimes",
  "03": "limitAmount",
  "04": "scopeBNumber"
};
promoLimiteds.forEach(
  ({ limitationCode, limitationValue }) => {
    // if (limitationCode === "01") {
    //   return actForm.limitSumTimes = limitationValue;
    // }
    // if (limitationCode === "02") {
    //   return actForm.limitTimes = limitationValue;
    // }
    // if (limitationCode === "03") {
    //   return actForm.limitAmount = limitationValue;
    // }
    // if (limitationCode === "04") {
    //   return actForm.scopeBNumber = limitationValue;
    // }
    (actForm[propMap[limitationCode]] = limitationValue)
  }
    
);


// better way
// 1
const { type = "add" } = arbitraryObject;
const typeFunctionMap = { mini: "splice", add: "add" };
this.$store.commit("productList/productCheckChange", {
  type: typeFunctionMap[type],
  code: productId,
  version: version
});
// 2
const { text = 11 } = arbitraryObject;
const statusStrMap = {
  19: "生成中",
  45: "制作中",
  46: "制作异常",
  50: "失败",
  49: "制作完成",
  6: "待执行"
};
return statusStrMap[text] || "defaultValue";
```

## 小的优化点

1. 变量/函数等命名规范
2. let/const/var
3. 减少请求接口的参数体数据量
4. 设计组件前要想好结果，组件之间要怎么传递属性，传递方法
5. semantic html 语义化


## 相关文章

[为什么我们需要减少甚至停止使用else表达式](https://medium.com/better-programming/why-you-need-to-stop-using-else-statements-5b1fd09dea9e)  
[五个编码原则 SOLID principle](https://blog.bitsrc.io/solid-principles-every-developer-should-know-b3bfa96bb688)  
[其他编码遵循原则](https://medium.com/better-programming/kiss-dry-and-code-principles-every-developer-should-follow-b77d89f51d74)

## 不相关内容

[Fira Code: free monospaced font with programming ligatures](https://github.com/tonsky/FiraCode)  
[Iosevka](https://github.com/be5invis/Iosevka)  
[Input: Fonts for code from DJR](https://input.fontbureau.com/)  
[Turbo Console Log](https://marketplace.visualstudio.com/items?itemName=ChakrounAnas.turbo-console-log)  
[Quokka.js](https://marketplace.visualstudio.com/items?itemName=WallabyJs.quokka-vscode)  
