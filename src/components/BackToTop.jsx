function BackToTop({ show, onClick }) {
  return (
    <a
      href="#"
      className={`btn btn-primary btn-lg-square back-to-top ${show ? "visible" : ""}`}
      onClick={onClick}
    >
      <i className="fa fa-arrow-up"></i>
    </a>
  );
}

export default BackToTop;
