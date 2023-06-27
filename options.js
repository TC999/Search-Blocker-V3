// options.js
// 获取文本输入框元素
var domains = document.getElementById("domains");

// 获取按钮元素
var save = document.getElementById("save");

// 定义一个函数，用于生成规则文件的内容
// 参数是一个网站域名的数组，返回值是一个 JSON 字符串，表示规则文件的内容
function generateRules(domains) {
  // 定义一个空数组，用于存储规则对象
  var rules = [];
  // 遍历网站域名数组
  for (var i = 0; i < domains.length; i++) {
    // 获取网站域名
    var domain = domains[i];
    // 定义一个规则对象，参考 https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#type-Rule
    var rule = {
      // 规则的 ID，必须是唯一的正整数，这里使用 i + 1
      id: i + 1,
      // 规则的优先级，必须是正整数，数字越大优先级越高，这里使用 i + 1
      priority: i + 1,
      // 规则的条件，必须包含一个资源类型和一个 URL 过滤器
      // 资源类型指定了规则适用于哪些类型的请求，这里使用 main_frame 表示主框架请求，即网页本身的请求
      // URL 过滤器指定了规则适用于哪些 URL，这里使用 ||domain 表示以 domain 结尾的主机名，参考 https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#url_filter_syntax
      condition: {
        resourceTypes: ["main_frame"],
        urlFilter: "||" + domain
      },
      // 规则的操作，指定了当条件满足时执行的操作，这里使用 block 表示阻止请求
      action: {
        type: "block"
      }
    };
    // 将规则对象添加到规则数组中
    rules.push(rule);
  }
  // 将规则数组转换为 JSON 字符串，并返回
  return JSON.stringify(rules);
}

// 定义一个函数，用于将规则文件的内容写入到 rules.json 文件中
// 参数是一个 JSON 字符串，表示规则文件的内容
// 这个函数需要使用浏览器提供的 fileSystem API 来操作文件系统
// 参考 https://developer.chrome.com/docs/extensions/reference/fileSystem/