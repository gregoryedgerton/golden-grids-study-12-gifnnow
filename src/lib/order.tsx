import { useId, useState, useSyncExternalStore } from "react";
import { ExpandedCell, type ExpandGroup } from "./expand";
import { photo, seen } from "../photos";
import { cited } from "../sources";
import { Fit } from "./fit";
import { Imprint } from "../icons";
import { ADDONS, SAUCES, type Item } from "../content";

/**
 * The order. An item's square opens in place into its builder: a size, the
 * add-ons a burger takes, the sauce that comes with the chicken, a flavour
 * for a drink. "Add to the bag" puts a line in the bag below the board.
 *
 * The reference's menu lists no prices, so none are shown and none are
 * invented: the bag counts items. Nothing is ordered and nothing is sent;
 * the bag lives in memory and is gone on reload.
 */
export interface Line { key: string; id: string; name: string; detail: string; qty: number }
let lines: Line[] = [];
const subs = new Set<() => void>();
const emit = () => subs.forEach((f) => f());
const subscribe = (f: () => void) => { subs.add(f); return () => { subs.delete(f); }; };
export function addLine(id: string, name: string, detail: string) {
  const key = `${id}|${detail}`;
  const at = lines.find((l) => l.key === key);
  lines = at ? lines.map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l)) : [...lines, { key, id, name, detail, qty: 1 }];
  emit();
}
export function setQty(key: string, qty: number) { lines = qty <= 0 ? lines.filter((l) => l.key !== key) : lines.map((l) => (l.key === key ? { ...l, qty } : l)); emit(); }
export function clearBag() { lines = []; emit(); }
export function useBag() { return useSyncExternalStore(subscribe, () => lines, () => lines); }

const CAT_TONE: Record<Item["cat"], string> = { mains: "red", sides: "green", drinks: "board", deals: "orange" };

function Choice({ legend, options, value, onChange, name }: { legend: string; options: string[]; value: string; onChange: (v: string) => void; name: string }) {
  return (
    <fieldset className="pick">
      <legend>{legend}</legend>
      <div className="pick__row">
        {options.map((o) => (
          <label key={o} className={value === o ? "is-on" : undefined}>
            <input type="radio" autoComplete="off" name={name} value={o} checked={value === o} onChange={() => onChange(o)} /><span>{o}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function Builder({ item }: { item: Item }) {
  const uid = useId();
  const [size, setSize] = useState(item.sizes[0]);
  const [addons, setAddons] = useState<string[]>([]);
  const [sauce, setSauce] = useState(SAUCES[0]);
  const [flavour, setFlavour] = useState(item.flavours?.[0] ?? "");
  const [added, setAdded] = useState(0);
  const combo = size === "Combo";
  const parts = [
    item.sizes.length > 1 ? size : "",
    ...addons.map((a) => `+ ${a.toLowerCase()}`),
    item.sauce ? `${sauce} sauce` : "",
    item.flavours && item.id !== "bigbolt" ? flavour : "",
    item.id === "bigbolt" ? `with ${flavour}` : "",
    combo ? "with fries and a soft drink" : "",
  ].filter(Boolean);
  const detail = parts.join(", ");
  return (
    <div className="builder">
      <p className="builder__about">{item.about}</p>
      {item.includes && <ul className="builder__inc">{item.includes.map((i) => <li key={i}>{i}</li>)}</ul>}
      {item.sizes.length > 1 && <Choice legend="Size" name={`${uid}s`} options={item.sizes} value={size} onChange={setSize} />}
      {item.addons && (
        <fieldset className="pick">
          <legend>Extras</legend>
          <div className="pick__row">
            {ADDONS.map((a) => (
              <label key={a} className={addons.includes(a) ? "is-on" : undefined}>
                <input type="checkbox" autoComplete="off" checked={addons.includes(a)} onChange={(e) => setAddons(e.target.checked ? [...addons, a] : addons.filter((x) => x !== a))} /><span>{a}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}
      {item.sauce && <Choice legend="Sauce (one included)" name={`${uid}c`} options={SAUCES} value={sauce} onChange={setSauce} />}
      {item.flavours && <Choice legend={item.cat === "deals" ? "Soft drink" : "Flavour"} name={`${uid}f`} options={item.flavours} value={flavour} onChange={setFlavour} />}
      <div className="builder__foot">
        <p className="builder__sum" aria-live="polite"><strong>{item.name}</strong>{detail ? `: ${detail}` : ""}</p>
        <button type="button" className="btn btn--gold" onClick={() => { addLine(item.id, item.name, detail); setAdded(added + 1); }}>Add to the bag</button>
        <a className="btn btn--line" href="#bag">See the bag</a>
      </div>
      <p className="note" role="status">{added > 0 ? `Added ${added === 1 ? "once" : `${added} times`}. Nothing has been ordered.` : "The reference lists no prices, so the bag counts items only."}</p>
    </div>
  );
}

/** A menu item as a square: the photograph (or a type square) under a board strip with its name and what the board lists for it. */
export function ItemCard({ item, x, slotKey }: { item: Item; x: ExpandGroup; slotKey: string }) {
  cited.add("site");
  const p = item.photo ? photo(item.photo) : null;
  if (item.photo) seen.add(item.photo);
  const tone = CAT_TONE[item.cat];
  const options = item.sizes.join(" | ");
  return (
    <>
      {p ? (
        <figure className={`media media--item media--${tone}`}>
          <img src={p.src} alt={p.alt} loading="lazy" style={item.pos ? { objectPosition: item.pos } : undefined} />
          <button className="media__open" {...x.triggerProps(slotKey)}><span className="visually-hidden">Order {item.name}: {options}</span></button>
          <figcaption className="media__caption">
            <span className="media__strip">{item.name}</span>
            <span className="media__opts">{options}</span>
            <span className="media__name">{item.pitch}</span>
          </figcaption>
        </figure>
      ) : (
        <div className={`box box--item box--${tone}`}>
          <Imprint name={item.id === "powerpack" ? "bag" : "bolt"} />
          <p className="box__label">{options}</p>
          <div className="box__fit"><Fit as="p" className="fit--display" min={12} max={150}>{item.name}</Fit></div>
          <div className="box__body"><Fit as="p" className="fit--body" min={12} max={26}>{item.pitch}</Fit></div>
          <div className="box__foot"><button className="btn btn--line" {...x.triggerProps(slotKey)}>Order<span className="visually-hidden"> {item.name}</span></button></div>
        </div>
      )}
      {x.isOpen(slotKey) && (
        <ExpandedCell id={x.panelId(slotKey)} title={item.name} onClose={x.close} closeRef={x.closeRef}>
          <div className={p ? "cell__split" : undefined}>
            {p && (
              <figure className="cell__photo">
                <img src={p.src} alt={p.alt} />
                <figcaption className="note">Photograph: {p.credit}, <a href={p.page}>{p.source}</a>, {p.licence}. Not Hot 'n Now's food or photograph.</figcaption>
              </figure>
            )}
            <Builder item={item} />
          </div>
        </ExpandedCell>
      )}
    </>
  );
}

/** The bag: a list, not a grid. */
export function Bag() {
  const bag = useBag();
  const count = bag.reduce((n, l) => n + l.qty, 0);
  return (
    <section className="bag" id="bag" aria-labelledby="bag-title">
      <div className="wrap">
        <div className="bag__card">
          <header className="bag__head">
            <h2 id="bag-title">Your bag</h2>
            <p className="bag__count" aria-live="polite">{count} {count === 1 ? "item" : "items"}</p>
          </header>
          {bag.length === 0 ? <p className="bag__empty">Nothing yet. Open any square on the board and add it.</p> : (
            <ul className="bag__lines">
              {bag.map((l) => (
                <li key={l.key}>
                  <span className="bag__name"><strong>{l.name}</strong>{l.detail && <span>{l.detail}</span>}</span>
                  <span className="bag__qty" role="group" aria-label={`Quantity of ${l.name}`}>
                    <button type="button" onClick={() => setQty(l.key, l.qty - 1)} aria-label={`One fewer ${l.name}`}>−</button>
                    <span>{l.qty}</span>
                    <button type="button" onClick={() => setQty(l.key, l.qty + 1)} aria-label={`One more ${l.name}`}>+</button>
                  </span>
                </li>
              ))}
            </ul>
          )}
          <div className="bag__foot">
            <button type="button" className="btn btn--line" onClick={clearBag} disabled={bag.length === 0}>Empty the bag</button>
            <p className="note">A layout study: nothing is ordered, priced or sent. To order, go to the window.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
