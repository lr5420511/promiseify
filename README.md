# promiseify
异步流程改善，把包含callback的异步函数promise化。对于访问数据库、io操作等非常有用。

对于未遵守nodejs回调函数规范（callback总是参数的最后一个，err总是callback参数的第一个）的异步函数,仅仅通过简单地调用时配置就可以了。
