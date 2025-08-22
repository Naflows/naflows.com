
const t =     {
    general: {
        name: '',
        description: '',
    },
    time: {
        createdOn: 0,
        lastEdit: 0,
    },
    resources: [
        /*{
            name: "Sesame API",
            link: 'https://test.io/'
        }*/
    ],
    content: [
        /*{
            general: {
                name: "Accessing the database",
                description: "Accessing the database can seem difficult, but it is actually really easy. The database is stored on Github and is accessible by fetching the links."
            },
            resources: [
                {
                    name: "Sesame API",
                    link: 'https://test.io/'
                }
            ],
            content: [
                {
                    exampleField1: "Example Value 1",
                    exampleField2: "Example Value 2",
                    exampleField3: "Example Value 3",
                    exampleField4: "Example Value 4",
                    exampleField5: "Example Value 5",
                    exampleField6: "Example Value 6",
                    exampleField7: "Example Value 7"
                }
            ]
        }*/
    ]
};


const template = () => {
    const id = (new Date()).getTime();
    const a = t;

    // The initial ID of the article is its date creation.
    a.time.createdOn = id;
    a.time.lastEdit = id;

    return a;
};



const data = {
    template : function() {
        return template()
    }
}
export default data;