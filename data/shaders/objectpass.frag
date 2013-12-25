#version 130
uniform sampler2D tex;
uniform sampler2D lighttex;
uniform int hastex;
uniform int haslightmap;

noperspective in vec3 nor;

void main() {
	vec4 light = vec4(1.0);
	vec4 color;

	if (haslightmap != 0) {
		light = texture2D(lighttex, gl_TexCoord[1].xy);
	}

	if (hastex != 0)
		color = texture2D(tex, gl_TexCoord[0].xy) * light;
	else
		color = gl_Color;

	gl_FragData[0] = vec4(color.xyz, 1.);
	gl_FragData[1] = vec4(0.5 * normalize(nor) + 0.5, gl_FragCoord.z);
	gl_FragData[2] = vec4(1. - color.a);
}

