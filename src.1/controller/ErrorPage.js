class ErrorPageCtrlr {
  ErrorPage(req, res) {
    res.render('error', { 
      title: 'Fast Food - Rest API',
      message : 'Page not found',
      content : 'Content'
    });
  }
}

const _ErrorPageCtrlr = new ErrorPageCtrlr();
export default _ErrorPageCtrlr;