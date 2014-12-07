yummy-rummy
===========

My wife Sarah, for reason, loved Yummy Rummy.  She loved it so much she refused
to order from GrubHub after they canceled it!  Now our food is delivered via
Seamless.

I put together this game as an exercise for how to deploy a single
multi-platform application that runs similarly everywhere.  Downloads:

* [Windows AMD64](https://drone.io/github.com/shutej/yummy-rummy/files/dist/windows_amd64/yummy-rummy.exe)
* [Mac OS X AMD64](https://drone.io/github.com/shutej/yummy-rummy/files/dist/darwin_amd64/yummy-rummy)
* [Linux AMD64](https://drone.io/github.com/shutej/yummy-rummy/files/dist/linux_amd64/yummy-rummy)
* [Linux ARM](https://drone.io/github.com/shutej/yummy-rummy/files/dist/linux_arm/yummy-rummy)

To develop this app, you'll need both Go and Node.  Typical workflow looks like this:

    go install github.com/jteeuwen/go-bindata/...
    (
        cd static
        npm install
        gulp
    )
    go install ./...

To make a distribution, gox is pretty helpful:

    go get github.com/mitchellh/gox
    mkdir dist
    gox --osarch="darwin/amd64 linux/amd64 windows/amd64 darwin/386 linux/386 windows/386 linux/arm"  --output="dist/{{.OS}}_{{.Arch}}/{{.Dir}}" ./...
