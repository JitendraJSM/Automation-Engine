<mxfile host="Electron" agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) draw.io/26.0.4 Chrome/128.0.6613.186 Electron/32.2.5 Safari/537.36" version="26.0.4">
  <diagram id="C5RBs43oDa-KdzZeNtuy" name="Page-1">
    <mxGraphModel dx="1036" dy="614" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0">
      <root>
        <mxCell id="WIyWlLk6GJQsqaUBKTNV-0" />
        <mxCell id="WIyWlLk6GJQsqaUBKTNV-1" parent="WIyWlLk6GJQsqaUBKTNV-0" />
        <mxCell id="WIyWlLk6GJQsqaUBKTNV-2" value="" style="rounded=0;html=1;jettySize=auto;orthogonalLoop=1;fontSize=11;endArrow=block;endFill=0;endSize=8;strokeWidth=1;shadow=0;labelBackgroundColor=none;edgeStyle=orthogonalEdgeStyle;" parent="WIyWlLk6GJQsqaUBKTNV-1" source="WIyWlLk6GJQsqaUBKTNV-3" target="WIyWlLk6GJQsqaUBKTNV-6" edge="1">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="WIyWlLk6GJQsqaUBKTNV-3" value="&lt;span style=&quot;text-wrap: nowrap;&quot;&gt;Optional Args: wsURL, initialURL&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fontSize=12;glass=0;strokeWidth=1;shadow=0;absoluteArcSize=1;container=0;expand=1;autosize=1;resizeWidth=1;resizeHeight=1;" parent="WIyWlLk6GJQsqaUBKTNV-1" vertex="1">
          <mxGeometry x="120" y="80" width="200" height="40" as="geometry" />
        </mxCell>
        <mxCell id="WIyWlLk6GJQsqaUBKTNV-4" value="Yes" style="rounded=0;html=1;jettySize=auto;orthogonalLoop=1;fontSize=11;endArrow=block;endFill=0;endSize=8;strokeWidth=1;shadow=0;labelBackgroundColor=none;edgeStyle=orthogonalEdgeStyle;" parent="WIyWlLk6GJQsqaUBKTNV-1" source="WIyWlLk6GJQsqaUBKTNV-6" edge="1">
          <mxGeometry x="-0.558" y="20" relative="1" as="geometry">
            <mxPoint as="offset" />
            <mxPoint x="220" y="360" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="WIyWlLk6GJQsqaUBKTNV-5" value="No" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;jettySize=auto;orthogonalLoop=1;fontSize=11;endArrow=block;endFill=0;endSize=8;strokeWidth=1;shadow=0;labelBackgroundColor=none;" parent="WIyWlLk6GJQsqaUBKTNV-1" source="WIyWlLk6GJQsqaUBKTNV-6" target="WIyWlLk6GJQsqaUBKTNV-7" edge="1">
          <mxGeometry y="10" relative="1" as="geometry">
            <mxPoint as="offset" />
          </mxGeometry>
        </mxCell>
        <mxCell id="WIyWlLk6GJQsqaUBKTNV-6" value="if ( wsURL )" style="rhombus;whiteSpace=wrap;html=1;shadow=0;fontFamily=Helvetica;fontSize=12;align=center;strokeWidth=1;spacing=6;spacingTop=-4;" parent="WIyWlLk6GJQsqaUBKTNV-1" vertex="1">
          <mxGeometry x="150" y="170" width="140" height="80" as="geometry" />
        </mxCell>
        <mxCell id="Wo21BQK3HSwo8RyhHDhD-7" style="edgeStyle=orthogonalEdgeStyle;shape=connector;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;shadow=0;strokeColor=default;strokeWidth=1;align=center;verticalAlign=middle;fontFamily=Helvetica;fontSize=11;fontColor=default;labelBackgroundColor=none;endArrow=block;endFill=0;endSize=8;exitX=0.5;exitY=1;exitDx=0;exitDy=0;" edge="1" parent="WIyWlLk6GJQsqaUBKTNV-1" source="WIyWlLk6GJQsqaUBKTNV-7">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="220" y="320" as="targetPoint" />
            <Array as="points">
              <mxPoint x="460" y="320" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="WIyWlLk6GJQsqaUBKTNV-7" value="await readWSfromFile()" style="rounded=1;whiteSpace=wrap;html=1;fontSize=12;glass=0;strokeWidth=1;shadow=0;" parent="WIyWlLk6GJQsqaUBKTNV-1" vertex="1">
          <mxGeometry x="360" y="190" width="200" height="40" as="geometry" />
        </mxCell>
        <mxCell id="Wo21BQK3HSwo8RyhHDhD-18" value="Yes" style="rounded=0;html=1;jettySize=auto;orthogonalLoop=1;fontSize=11;endArrow=block;endFill=0;endSize=8;strokeWidth=1;shadow=0;labelBackgroundColor=none;edgeStyle=orthogonalEdgeStyle;" edge="1" parent="WIyWlLk6GJQsqaUBKTNV-1" source="Wo21BQK3HSwo8RyhHDhD-20">
          <mxGeometry x="-0.558" y="20" relative="1" as="geometry">
            <mxPoint as="offset" />
            <mxPoint x="220" y="560" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="Wo21BQK3HSwo8RyhHDhD-19" value="No" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;jettySize=auto;orthogonalLoop=1;fontSize=11;endArrow=block;endFill=0;endSize=8;strokeWidth=1;shadow=0;labelBackgroundColor=none;" edge="1" parent="WIyWlLk6GJQsqaUBKTNV-1" source="Wo21BQK3HSwo8RyhHDhD-20" target="Wo21BQK3HSwo8RyhHDhD-22">
          <mxGeometry y="10" relative="1" as="geometry">
            <mxPoint as="offset" />
          </mxGeometry>
        </mxCell>
        <mxCell id="Wo21BQK3HSwo8RyhHDhD-20" value="if ( initialURL )" style="rhombus;whiteSpace=wrap;html=1;shadow=0;fontFamily=Helvetica;fontSize=12;align=center;strokeWidth=1;spacing=6;spacingTop=-4;" vertex="1" parent="WIyWlLk6GJQsqaUBKTNV-1">
          <mxGeometry x="150" y="360" width="140" height="80" as="geometry" />
        </mxCell>
        <mxCell id="Wo21BQK3HSwo8RyhHDhD-21" style="edgeStyle=orthogonalEdgeStyle;shape=connector;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;shadow=0;strokeColor=default;strokeWidth=1;align=center;verticalAlign=middle;fontFamily=Helvetica;fontSize=11;fontColor=default;labelBackgroundColor=none;endArrow=block;endFill=0;endSize=8;exitX=0.5;exitY=1;exitDx=0;exitDy=0;" edge="1" parent="WIyWlLk6GJQsqaUBKTNV-1" source="Wo21BQK3HSwo8RyhHDhD-22">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="220" y="510" as="targetPoint" />
            <Array as="points">
              <mxPoint x="460" y="510" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="Wo21BQK3HSwo8RyhHDhD-22" value="&lt;span style=&quot;font-family: &amp;quot;JetBrains Mono&amp;quot;, Consolas, &amp;quot;Courier New&amp;quot;, monospace; font-size: 13px; white-space: pre; background-color: rgb(23, 27, 38); color: rgb(222, 212, 126);&quot;&gt;process&lt;/span&gt;&lt;span style=&quot;color: rgb(212, 212, 212); font-family: &amp;quot;JetBrains Mono&amp;quot;, Consolas, &amp;quot;Courier New&amp;quot;, monospace; font-size: 13px; white-space: pre; background-color: rgb(23, 27, 38);&quot;&gt;.&lt;/span&gt;&lt;span style=&quot;font-family: &amp;quot;JetBrains Mono&amp;quot;, Consolas, &amp;quot;Courier New&amp;quot;, monospace; font-size: 13px; white-space: pre; background-color: rgb(23, 27, 38); color: rgb(224, 227, 238);&quot;&gt;env&lt;/span&gt;&lt;span style=&quot;color: rgb(212, 212, 212); font-family: &amp;quot;JetBrains Mono&amp;quot;, Consolas, &amp;quot;Courier New&amp;quot;, monospace; font-size: 13px; white-space: pre; background-color: rgb(23, 27, 38);&quot;&gt;.&lt;/span&gt;&lt;span style=&quot;font-family: &amp;quot;JetBrains Mono&amp;quot;, Consolas, &amp;quot;Courier New&amp;quot;, monospace; font-size: 13px; white-space: pre; background-color: rgb(23, 27, 38); color: rgb(128, 187, 255);&quot;&gt;INITIAL_URL&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fontSize=12;glass=0;strokeWidth=1;shadow=0;" vertex="1" parent="WIyWlLk6GJQsqaUBKTNV-1">
          <mxGeometry x="360" y="380" width="200" height="40" as="geometry" />
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
