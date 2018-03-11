import {article, blockquote, dd, div, dl, dt, footer, h1, h2, hr, img, p, span, table, tbody, td, th, thead, tr } from "../builder";

import {VirtualElement} from "../types";

export const articlePage = article(
  {lang: "en-us", "data-id": 65473},
  h1({id: "bacon-ipsum"}, "Bacon ipsum"),
  h2({id: "pork-loin-breasola"}, "Pork", span({class: "censor-override"}, "loin"), "bresaola"),
  p("Pancetta ribeye chicken, landjaeger", span({class: "highlight"}, "meatloaf pastrami")),
  p("Sirloin salami spare ribs kevin jerky"),
  h2({id: "prosciutto-turkey"}, "Prosciutto turkey"),
  p("Ham hock boudin shoulder"),
  img({src: "beebop.png", class: "pull-right"}),
  p("Ribeye drumstick t-bone"),
  hr({class: "page-break"}),
  h2({id: "tail-corned-beef"}, "Tail corned beef"),
  p("Pork belly burgdoggen", span({class: "highlight"}, "pastrami")),
  blockquote({lang: "en-uk", class: "pull-right"}, "Salami"),
  p("...and that is why I love ham."),
  footer(
    dl(
      dt("author"),
      dd({"data-id": 666}, "David"),
      dt("date"),
      dd("2018-03-11"),
    ),
  ),
);

export const bigTable = div(
  {lang: "en-uk"},
  h1({id: "user-data"}, "User data"),
  p("Loaded from the DB for you!"),
  table(
    {id: "output"},
    thead(
      tr(
        th("Name"), th("Superpower"), th("Quote"),
      ),
    ),
    tbody(
      tr(
        td({"data-uid": "david"}, "David"),
        td({"data-pid": "flight", "class": "refreshed"}, "flying"),
        td({lang: "la"}, "Elige rubrum catapotium"),
      ),
      tr(
        td({"data-uid": "hannes"}, "Hannes"),
        td,
        td({lang: "la"}, "Omnia faeces"),
      ),
      tr(
        td({"data-uid": "jacob"}, "Jacob"),
        td({"data-pid": "laser"}, "laser eyes"),
        td({lang: "la", class: "refreshed"}, "Carpe noctem"),
      ),
    ),
  ),
);

export const treesByName: {[name: string]: VirtualElement} = {
  article: articlePage,
  table: bigTable,
};
