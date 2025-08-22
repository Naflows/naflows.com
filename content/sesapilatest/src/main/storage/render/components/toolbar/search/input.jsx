import appInput from "../../../../../../../public/modules/utilities/input";
import appSvg from "../../../../../../../public/modules/utilities/svg";


function TriggerSearchResult() {
    const i = document.getElementById('searchInput');
    const v = i.value;
    const c = document.querySelectorAll('.article-read-display');
    const h = document.querySelector('.hide_button');
    console.log(v)
    if (v.length >= 1) {
        h.style.opacity = "1";
    } else {
        h.style.opacity = "0";
    }

    c.forEach((_) => {
        const t = _.querySelector('.link .content .header .name');
        const d = _.querySelector('.link .content .header .description');
        console.log(t,d)
        if ((!t || (t && !t.innerHTML.includes(v))) && (!d || (d && !d.innerHTML.includes(v)))) {
            _.style.display = 'none';
        } else if (_.style.display == 'none' || v.length == 0) {
            _.style.display = 'flex';
        }
    })
}

const SearchInput = () => {
    return (
    <div className="input">
        {appInput.new(
            'input',
            "Search an article",
            '',
            'searchInput',
            ['main-search-bar'],
            TriggerSearchResult
        )}
        <div className="hide_button" style={{opacity:"0"}} onClick={() => {
            document.getElementById('searchInput').value = null;
            TriggerSearchResult()
        }}>
            {appSvg.new('close')}
        </div>
    </div>
    )
}

export default SearchInput;