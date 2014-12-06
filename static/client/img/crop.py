#!/usr/bin/env python2.7

import numpy
names = "cake chocolate cookies peppermint".split()
dims = numpy.array([
    [750., 750.],
    [948., 710.],
    [640., 429.],
    [399., 282.]])

aspect_ratio = (dims[:, 0] / dims[:, 1]).min()

desired = numpy.vstack((
    dims[:, 1] * aspect_ratio,
    dims[:, 1])).T

delta = numpy.floor((dims - desired) / 2.)

for i, name in enumerate(names):
    h, w = desired[i, :].astype(int)
    x, y = delta[i, :].astype(int)
    print "convert {name}.jpg -crop '{w}x{h}!+{x}+{y}' +repage -resize '280x280' {name}.crop.jpg".format(**locals())
