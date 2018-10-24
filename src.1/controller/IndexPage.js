class IndexPageCtrlr {
  IndexPage(req, res) {
	res.render('index', { title: 'Fast Food - Rest API' });
  }
}

const _IndexPageCtrlr = new IndexPageCtrlr();
export default _IndexPageCtrlr;