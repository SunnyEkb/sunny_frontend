import { Link } from "react-router-dom";
import style from "./breadcrumbs.module.scss";
import React from "react";

type BreadCrumbsProps = {
  paths: { path?: string; title: string }[];
  className?: string;
};

const BreadCrumbs = ({ paths, className }: BreadCrumbsProps) => (
  <section className={`${style.breadcrumbs} ${className ? className : ""}`}>
    <Link to="/">Главная</Link> {" "}
    {paths.map(({ path, title }, index) => (
      <React.Fragment key={index}>
        <span> &gt; </span>
        {path ? <Link to={path}>{title}</Link> : <span>{title}</span>}
      </React.Fragment>
    ))}
  </section>
);
export default BreadCrumbs;
