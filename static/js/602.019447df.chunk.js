"use strict";(self.webpackChunkfilmoteka=self.webpackChunkfilmoteka||[]).push([[602],{7602:function(e,s,i){i.r(s);var a=i(2791),n=i(7689),r=i(1087),c=i(6083),l=i(5510),t=i(4757),d=i(4430),o=i(3402),v=i(3360),m=i(2685),h=i(5048),u=i(576),j=i(3329);s.default=function(){var e,s,i=(0,h.I0)(),x=(0,n.UO)().movieId,f=(0,n.TH)(),p=(0,a.useRef)(null!==(e=null===(s=f.state)||void 0===s?void 0:s.from)&&void 0!==e?e:"/movies"),N=(0,d.Cz)(x,{skip:!x}),k=N.data,w=N.isLoading,g=N.error,b=(0,h.v9)((function(e){return e.user})).id,L=null!==k&&void 0!==k?k:{},O=(0,h.v9)((function(e){return e.watchlist})).movies,C=null===O||void 0===O?void 0:O.some((function(e){return e.id===L.id}));(0,a.useEffect)((function(){g&&o.ZP.error(g.data.message)}),[g]),(0,a.useEffect)((function(){O&&function(e){if(b){var s=(0,m.N8)();(0,m.t8)((0,m.iH)(s,"users/"+b),{movies:e})}}(O)}),[O,b]);var R=L.title,I=L.poster_path,_=L.vote_average,A=L.overview,E=L.genres,H=L.release_date;return w?(0,j.jsx)(l.a,{}):(0,j.jsxs)("div",{className:"mb-4",children:[(0,j.jsx)(c.e,{backLinkLocationRef:p.current}),(0,j.jsxs)("div",{className:"row",children:[(0,j.jsxs)("div",{className:"col-4",children:[(0,j.jsx)("img",{src:I?"https://image.tmdb.org/t/p/w300/".concat(I):t,className:"card-img-top",alt:R}),b&&(0,j.jsx)(v.Z,{className:"mt-3 w-100",onClick:function(){i(C?(0,u.fx)(L.id):(0,u.dO)(L))},children:C?"Remove from watchlist":"Add to watchlist"})]}),(0,j.jsxs)("div",{className:"col-8",children:[(0,j.jsx)("h1",{children:R}),(0,j.jsxs)("p",{children:[(0,j.jsx)("b",{children:"User Score:"})," ",Math.round(10*_)," %"]}),(0,j.jsxs)("p",{children:[(0,j.jsx)("b",{children:"Release date:"})," ",H]}),(0,j.jsx)("h3",{children:"Overview"}),(0,j.jsx)("p",{children:A}),(0,j.jsx)("h3",{children:"Genres"}),(0,j.jsx)("div",{children:E&&E.map((function(e){var s=e.id,i=e.name;return(0,j.jsxs)("span",{children:[i," "]},s)}))})]})]}),(0,j.jsx)("h2",{className:"mt-3 mb-3",children:"Additional Information"}),(0,j.jsxs)("ul",{className:"nav nav-tabs",children:[(0,j.jsx)("li",{className:"nav-item",children:(0,j.jsx)(r.OL,{className:"nav-link","aria-current":"page",to:"cast",children:"Cast"})}),(0,j.jsx)("li",{className:"nav-item",children:(0,j.jsx)(r.OL,{className:"nav-link","aria-current":"page",to:"reviews",children:"Reviews"})}),(0,j.jsx)("li",{className:"nav-item",children:(0,j.jsx)(r.OL,{className:"nav-link","aria-current":"page",to:"videos",children:"Videos"})})]}),(0,j.jsx)(a.Suspense,{fallback:(0,j.jsx)(l.a,{}),children:(0,j.jsx)(n.j3,{})})]})}}}]);
//# sourceMappingURL=602.019447df.chunk.js.map