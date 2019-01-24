# xxx

> xxx

## Build Setup

``` bash
npm install

# 启动时指定连接的beta环境版本：b1~b8
npm start b3

```

## 项目公约（强制执行）

### 项目目录
  按照架构图中的目录执行   
  ![src目录规范]()

### git
---
- 分支号命名 
  日期-功能性描述，如：20010707-init

- commit信息格式
  - feat:某个功能点
  - del:删除某个文件、功能、代码片段
  - fix:某个bug
  - doc:文档类的变更
  - style:代码格式的修改或优化，不影响业务功能
  - chore:构建或辅助工具等非业务相关的变动

### 前后端协作
  - 系统中用到的接口督促后端同学及时准确地维护在接口系统中
  - 前后端接口规范（在制定接口时，务必遵循）

    ```js
    /**
    * method选取
    * 整体上遵循原则
    * 获取数据：GET
    * 提交数据：POST
    */

    /**
    * 响应的数据结构
    * status: 0或非0，非0表示业务处理失败，非0时，msg必须包含相应的信息
    * msg: 用于向用户展示的信息提示
    * data: 
    * 包含了响应数据，数据类型为对象，
    * 即假设响应只有一个字段name，那么不应是data: 'somename'，而应是data: { name: 'somename' }
    */
    const res = {
      status: 0,
      msg: '查询xxx失败',
      data: {
        name: 'Tony',
      },
    }

    /**
    * 分页查询时的传参与响应规范
    */
    // 传参
    const req = {
      page: {
        pageNo: 1,
        pageSize: 10,
      },
      otherParam: 'xxx',
    }
    // 响应
    const res = {
      status: 0,
      msg: '',
      data: {
        data: [
          {
            // 数据
          },
          {
            // 数据
          },
        ],
        page: {
          totalSize: 32,
          curPage: 1,
          pageSize: 10,
        },
        otherData: '',
      },
    }

    /**
    * 对于下拉、单选项、文案展示状态映射类型的数据
    * 我们统一约定 值用code表示，文案用name表示
    */
    const status = [
      {
        code: 1,
        name: '已审核',
      },
      {
        code: 2,
        name: '未审核',
      },
      {
        code: 3,
        name: '已投放',
      },
    ]
    ```

### 代码编写
---
##### js
- 文件作者：对于组件、页面的入口js文件，必须标注出作者（此处建议使用vscode，插件选择vscode-fileheader，对vscode-fileheader设置如下）

  ```js
  "fileheader.Author": "YOURNAME",
  "fileheader.LastModifiedBy": "YOURNAME",
  "fileheader.tpl": "/*\r\n * @File: \r\n * @Wiki: \r\n * @Author: {author}\r\n * @Date: {createTime}\r\n*/",

  ```
- 组件开发
  - 必须包含组件的使用方式说明
  - 组件抽取原则：组件分为系统级、频道级、页面级组件，两处及以上使用到同一功能时需抽成组件
- vue
  - 组件三大件书写顺序 1. script 2. template 3. style
  - 实例属性书写顺序   
    ![vue属性书写顺序]()
  - method命名
    - 绑定dom或组件事件命名：以handle开头，如 **handle**Export
- 跨窗口通信postMessage
  - 命名规则：**PM**-pageName-xxx
- 关于时间处理，使用[momentjs](https://momentjs.com/docs/)处理时间，统一采用24小时制（H表示24小时制，h表示12小时制）

#### css
- 项目使用[webBaseCSS](https://attacking.github.io/webBaseCSS/)作为UI组件库的补充样式库，所以不要在页面或组件的less文件中出现```.mt10```等重复性样式类
- 在制定页面样式时，遵守[平面设计四大原则](https://zhuanlan.zhihu.com/p/26699949)：对齐、对比、重复与亲密性
- 字号与字体颜色在系统已有值中选取，禁止肆意新增
  - 字号 .fs12、.fs14、.fs16、.fs18、.fs20、.fs22、.fs24
  - 色值 .green .red .yellow .red. .black .dark .gray .light-gray .white

#### html
- 减少dom层级，避免出现无意义嵌套
- 自闭合标签添加闭合符，闭合符前空格 如 `<br />`
- vue的模板文件中，组件属性书写顺序：普通属性 > 绑定属性 > 事件处理

  ```js
  <el-select
    remote
    clearable
    filterable
    class="w200"
    value-key="name"
    default-first-option
    v-model="searchData.shopName"
    placeholder="先选择销售点ID/销售点名称"
    v-if="searchData.shopType === 'shopName'"
    :remote-method="getShopSuggest"
    @change="handleSelectShop"
  >
  ```
- 注释
  - 单行注释 用//，写在被注释行上一行

    ```js
    // 信息汇总
    detailData: [],
    ```
  - 多行注释
  
    ```js
    /*
     * @File:
     * @Wiki:
     * @Author: XXX
     * @Date: 2018-05-10 13:54:44
     */
    ```
- 标点符合 中文语境中文标点，英文语境英文标点（注意英文逗号、句号后面要加空格）

## 玩转项目
### request
  使用时，参数顺序依次为uri、data和config: Request.get(uri, data, { useLoading: true }).then(...).catch(...);
  resolve时，只传递data，reject时，只传递msg

  ```js
  Request.post('url', {name: 'big'}, {
    useLoading: true
  }).then((data) => {
    // 在此处理staus为0的业务逻辑，其中data即为响应中data字段
    this.tableData = data.data || [];
    this.totalSize = data.page.totalSize;
  }).catch((msg) => {
    // 在此处理status非0的业务异常逻辑，其中msg即为res中的msg，若msg为空，则request会传递默认文案
    this.$message.error(msg);
  });
  ```

### 代理方案
代理方案目前使用vue-cli的默认代理，配置文件位于config/index.js中

### elementUI下的Message组件封装
一个名叫`smartMessage`的消息组件让elementUI的Message使用更优雅，其在内部计算消息字符串长度并给Message设置合理的duration，无须开发者显式指明duration。   
使用方式和Message一样，但仅限于提示内容为字符串类型。如：
```js
  this.$smartMessage('我是信息');
  this.$smartMessage.success('操作成功');
  this.$smartMessage.warning('信息格式有误');
  this.$smartMessage.error('服务器异常，请稍候');
  this.$smartMessage({
    message: '恭喜你，这是一条成功消息',
    type: 'success'
  });
```
### 前端路由
项目采用自动化路由方案[spa-auto-route](https://www.npmjs.com/package/spa-auto-route)，开发者无须关心路由配置。但基础的路由规则须了解：

1. 自动路由会遍历`/src/view`下所有的`.vue`文件（除`components`目录下）生成路由配置，文件的路径即为路由路径`path`（会转为小写形式），`.vue`文件中的`name`即作为路由的名称`name`（所以务必为每个vue组件指定name属性）；
2. 不要为页面对应的首页及嵌套路由的父组件建立文件夹：  
    - 页面对应首页  

      正确示例：  
      Shelf  
      ├── api.js  
      ├── config.js  
      ├── index.vue  
      ├── index.html  
      ├── index.less  
      ├── DetailInfo  
      │   └── index.vue  
      ├── Log  
      │   └── index.vue  

      错误示例：  
      Shelf  
      ├── Home  
      │   └── api.js  
      │   └── config.js  
      │   └── index.vue  
      │   └── index.html  
      │   └── index.less  
      ├── DetailInfo  
      │   └── index.vue  
      ├── Log  
      │   └── index.vue  

    - 嵌套路由的父组件

      正确示例：  
      Shelf/DetailInfo  
      ├── api.js 
      ├── config.js  
      ├── index.vue  
      ├── index.html  
      ├── index.less  
      ├── CheckRecord  
      │   └── index.vue  
      │   └── config.js  
      ├── CustomerInfo  
      │   └── index.vue  
      │   └── config.js  

      错误示例：  
      Shelf/DetailInfo  
      ├── Home  
      │   └── api.js  
      │   └── config.js  
      │   └── index.vue  
      │   └── index.html  
      │   └── index.less  
      ├── CheckRecord  
      │   └── index.vue  
      │   └── config.js  
      ├── CustomerInfo  
      │   └── index.vue  
      │   └── config.js  

3. 嵌套路由实现方式  
在父组件中指名其内部包含的子路由文件夹名称（子路由文件夹应与父容器同级存放）
    ```js
    export default {
      nestedRoutes: [
        'CheckRecord',
        'CustomerInfo',
        ...
      ],
      name: 'DetailInfoHome',
      ...
    }
    ```
4. 嵌套路由时的redirect实现方式  
在父组件中指名其内部包含的子路由文件夹名称（子路由文件夹应与父容器同级存放）
    ```js
    export default {
      nestedRoutes: [
        'CheckRecord',
        'CustomerInfo',
        ...
      ],
      redirect: 'path/to/detailinfohome/customerinfo',
      name: 'DetailInfoHome',
      ...
    }
    ```
5. 由url对应到具体文件方法  
    - 按照url路径对应到view的文件目录即可
    - 借助chrome的vue插件，由当前视图的name为关键词在工程的view下搜索

### api.js文件引入名称命名建议
按照项目架构，api.js文件分为全局、频道级、页面级，对应的，在某个文件引入这些api.js文件时，建议命名为GAPI（global）、CAPI（channel）、PAPI（page），如
```js
import GAPI from '@/api';
import CAPI from '../../api';
import PAPI from '../api';
```
