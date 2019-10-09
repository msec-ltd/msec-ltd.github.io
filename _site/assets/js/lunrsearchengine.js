
var documents = [{
    "id": 0,
    "url": "http://localhost:4000/404.html",
    "title": "404",
    "body": "404 Page does not exist!Please use the search bar at the top or visit our homepage! "
    }, {
    "id": 1,
    "url": "http://localhost:4000/about",
    "title": "About Us",
    "body": "I'm a passionate cyber security professional with significant hands-on experience in delivering and assessing Agile Security Architectures and building modern and scalable Application Security programs. I started MSec Consulting with a vision to help organisations implement business-driven, modern application security strategies.    Address  58 Lyford Road,   London, England, SW18 3JJ  Contact    E:  manish@msec. ltd        "
    }, {
    "id": 2,
    "url": "http://localhost:4000/categories",
    "title": "Categories",
    "body": ""
    }, {
    "id": 3,
    "url": "http://localhost:4000/",
    "title": "Home",
    "body": "      Featured:                                                                                                                                                                                                           Introduction to Containers                              :               In recent years, containers have grown in popularity and they have been catching a lot of attention due to the emergence of Docker. Containers are. . . :                                                                                                                                                                       Manish                                09 Oct 2019                                                                                                                      All Stories:                                                                                                     Introduction to Containers              :       In recent years, containers have grown in popularity and they have been catching a lot of attention due to the emergence of Docker. Containers are especially useful for microservice architectures. . . :                                                                               Manish                09 Oct 2019                                            "
    }, {
    "id": 4,
    "url": "http://localhost:4000/robots.txt",
    "title": "",
    "body": "      Sitemap: {{ “sitemap. xml”   absolute_url }}   "
    }, {
    "id": 5,
    "url": "http://localhost:4000/introduction-to-containers/",
    "title": "Introduction to Containers",
    "body": "2019/10/09 - In recent years, containers have grown in popularity and they have been catching a lot of attention due to the emergence of Docker. Containers are especially useful for microservice architectures and are revolutionising DevOps by providing easy application packaging and deployment capabilities. Docker didn’t invent them, but they did make it quite accessible and easy to use. I have been using Docker for a few years now, mostly to experiment with or trying to study the security implications of insecurely configured application containers. However, to really understand the security implications and secure configurations, you need to look under the hood and study the underlying technologies that make these containers possible. This series of blog posts are my journey into learning container internals and getting deep into the concepts that enable the creation of containers. For these particular posts, when we refer to containers, we will limit ourselves to Linux containers. Similar container technologies exist for other operating systems. For examples Solaris Zones, FreeBSD Jails, etc. So what is a Container?:  A container is a collection of software processes unified by one namespace, with access to an operating system kernel that it shares with other containers and little to no access between containers. 1 The most popular implementaion of containers is the runC container runtime which implements the Open Container Initiative (OCI) specification. Lately, a lot of standardisation effort has been taking place in container technology enabled by the Linux Foundation. Ok, so as a definition that sounds good, but what does this mean exactly? How is all this possible? Container vs Virtual Machine: A container is a virualisation concept, but unlike a virtual machine, it is quite lightweight and fast. The core difference between a container and a traditional virtual machine is that it does not require a full blown guest operating system or hypervisor to emulate the hardware. Containers share the same host operating system kernel. The difference can be visualised as follows: 2 Under the hood, containers are made possible by the use of namespaces, cgroups, capabilities, and filesystem access controls provided by the Linux Kernel. I highly recommend reading the Kernel man pages to understand these concepts in detail. In this series of blog posts, I will share detailed walkthroughs of these Kernel concepts along with sample source code for experimenting and having fun with these technologies. The next post will begin with exploring Linux namespaces in detail. References:       History of Linux Containers &#8617;        What’s a Linux container &#8617;    "
    }];

var idx = lunr(function () {
    this.ref('id')
    this.field('title')
    this.field('body')

    documents.forEach(function (doc) {
        this.add(doc)
    }, this)
});
function lunr_search(term) {
    document.getElementById('lunrsearchresults').innerHTML = '<ul></ul>';
    if(term) {
        document.getElementById('lunrsearchresults').innerHTML = "<p>Search results for '" + term + "'</p>" + document.getElementById('lunrsearchresults').innerHTML;
        //put results on the screen.
        var results = idx.search(term);
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><br /><span class='body'>"+ body +"</span><br /><span class='url'>"+ url +"</span></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>No results found...</li>";
        }
    }
    return false;
}

function lunr_search(term) {
    $('#lunrsearchresults').show( 400 );
    $( "body" ).addClass( "modal-open" );
    
    document.getElementById('lunrsearchresults').innerHTML = '<div id="resultsmodal" class="modal fade show d-block"  tabindex="-1" role="dialog" aria-labelledby="resultsmodal"> <div class="modal-dialog shadow-lg" role="document"> <div class="modal-content"> <div class="modal-header" id="modtit"> <button type="button" class="close" id="btnx" data-dismiss="modal" aria-label="Close"> &times; </button> </div> <div class="modal-body"> <ul class="mb-0"> </ul>    </div> <div class="modal-footer"><button id="btnx" type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Close</button></div></div> </div></div>';
    if(term) {
        document.getElementById('modtit').innerHTML = "<h5 class='modal-title'>Search results for '" + term + "'</h5>" + document.getElementById('modtit').innerHTML;
        //put results on the screen.
        var results = idx.search(term);
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><br /><small><span class='body'>"+ body +"</span><br /><span class='url'>"+ url +"</span></small></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>Sorry, no results found. Close & try a different search!</li>";
        }
    }
    return false;
}
    
$(function() {
    $("#lunrsearchresults").on('click', '#btnx', function () {
        $('#lunrsearchresults').hide( 5 );
        $( "body" ).removeClass( "modal-open" );
    });
});